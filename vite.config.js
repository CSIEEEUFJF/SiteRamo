import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ATAS_ORIGIN = process.env.ATAS_API_ORIGIN || 'https://interno.ieeeufjf.com.br';
const SESSION_COOKIE = 'atas_ieee_session';
const MAX_JSON_BODY_BYTES = 64 * 1024;

export default defineConfig({
  plugins: [react(), atasAdminProxy()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        en: 'en.html',
      },
    },
  },
});

function atasAdminProxy() {
  return {
    name: 'atas-admin-proxy',
    configureServer(server) {
      server.middlewares.use('/api/atas-auth', async (request, response) => {
        try {
          if (request.method === 'GET') {
            return proxyJson(request, response, '/api/auth/me', { method: 'GET' }, { local: true });
          }

          if (request.method === 'POST') {
            if (!isSameOriginRequest(request)) {
              return sendJson(response, 403, { detail: 'Origem invalida.' });
            }

            const body = await readBody(request);
            return proxyJson(
              request,
              response,
              '/api/auth/login',
              {
                body,
                headers: { 'Content-Type': request.headers['content-type'] || 'application/json' },
                method: 'POST',
              },
              { local: true },
            );
          }

          if (request.method === 'DELETE') {
            if (!isSameOriginRequest(request)) {
              return sendJson(response, 403, { detail: 'Origem invalida.' });
            }

            await proxyFetch(request, '/api/auth/logout', { method: 'POST' });
            response.setHeader('Set-Cookie', clearLocalSessionCookie());
            return sendJson(response, 200, { ok: true });
          }

          response.setHeader('Allow', 'GET, POST, DELETE');
          return sendJson(response, 405, { detail: 'Metodo nao permitido.' });
        } catch (error) {
          return sendJson(response, error.statusCode || 502, {
            detail: error.message || 'Nao foi possivel conectar ao sistema de atas.',
          });
        }
      });

      server.middlewares.use('/api/atas-site-members', async (request, response) => {
        try {
          if (request.method === 'GET') {
            return proxyJson(request, response, '/api/site-members', { method: 'GET' }, { local: true });
          }

          if (request.method === 'POST') {
            if (!isSameOriginRequest(request)) {
              return sendJson(response, 403, { detail: 'Origem invalida.' });
            }

            const body = await readBody(request);
            return proxyJson(
              request,
              response,
              '/api/site-members/manage',
              {
                body,
                headers: { 'Content-Type': request.headers['content-type'] || 'application/json' },
                method: 'POST',
              },
              { local: true },
            );
          }

          if (request.method === 'PATCH') {
            if (!isSameOriginRequest(request)) {
              return sendJson(response, 403, { detail: 'Origem invalida.' });
            }

            const memberId = getMemberId(request);
            if (!memberId) {
              return sendJson(response, 400, { detail: 'Membro invalido.' });
            }

            const body = await readBody(request);
            return proxyJson(
              request,
              response,
              `/api/site-members/manage/${encodeURIComponent(memberId)}`,
              {
                body,
                headers: { 'Content-Type': request.headers['content-type'] || 'application/json' },
                method: 'PATCH',
              },
              { local: true },
            );
          }

          if (request.method === 'DELETE') {
            if (!isSameOriginRequest(request)) {
              return sendJson(response, 403, { detail: 'Origem invalida.' });
            }

            const memberId = getMemberId(request);
            if (!memberId) {
              return sendJson(response, 400, { detail: 'Membro invalido.' });
            }

            return proxyJson(
              request,
              response,
              `/api/site-members/manage/${encodeURIComponent(memberId)}`,
              { method: 'DELETE' },
              { local: true },
            );
          }

          response.setHeader('Allow', 'GET, POST, PATCH, DELETE');
          return sendJson(response, 405, { detail: 'Metodo nao permitido.' });
        } catch (error) {
          return sendJson(response, error.statusCode || 502, {
            detail: error.message || 'Nao foi possivel conectar ao sistema de atas.',
          });
        }
      });

      server.middlewares.use('/api/drive-image', async (request, response) => {
        try {
          if (!['GET', 'HEAD'].includes(request.method || '')) {
            response.setHeader('Allow', 'GET, HEAD');
            return sendJson(response, 405, { detail: 'Metodo nao permitido.' });
          }

          const fileId = getDriveImageId(request);
          if (!fileId) {
            return sendJson(response, 400, { detail: 'Imagem invalida.' });
          }

          const upstream = await fetch(
            `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=view`,
            { cache: 'no-store' },
          );

          if (!upstream.ok) {
            return sendJson(response, upstream.status, { detail: 'Imagem indisponivel.' });
          }

          const contentType = upstream.headers.get('content-type') || '';
          if (!contentType.startsWith('image/')) {
            return sendJson(response, 502, { detail: 'Arquivo nao e uma imagem publica.' });
          }

          response.statusCode = 200;
          response.setHeader('Cache-Control', 'no-store, max-age=0');
          response.setHeader('Content-Type', contentType);
          response.setHeader('X-Content-Type-Options', 'nosniff');
          const contentLength = upstream.headers.get('content-length');
          if (contentLength) {
            response.setHeader('Content-Length', contentLength);
          }

          if (request.method === 'HEAD') {
            return response.end();
          }

          const buffer = Buffer.from(await upstream.arrayBuffer());
          return response.end(buffer);
        } catch (error) {
          return sendJson(response, 502, {
            detail: error.message || 'Nao foi possivel carregar a imagem.',
          });
        }
      });
    },
  };
}

async function proxyJson(request, response, pathname, init, options = {}) {
  const upstream = await proxyFetch(request, pathname, init);
  const text = await upstream.text();
  const setCookies = getSetCookies(upstream);

  response.statusCode = upstream.status;
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (setCookies.length) {
    response.setHeader(
      'Set-Cookie',
      options.local ? setCookies.map(rewriteCookieForLocalhost) : setCookies,
    );
  }
  response.end(text);
}

async function proxyFetch(request, pathname, init = {}) {
  const headers = { ...(init.headers || {}) };
  const cookie = getSessionCookieHeader(request.headers.cookie);
  if (cookie) {
    headers.Cookie = cookie;
  }

  return fetch(`${ATAS_ORIGIN}${pathname}`, {
    ...init,
    headers,
  });
}

function getMemberId(request) {
  const url = new URL(request.url || '', 'http://localhost');
  return url.searchParams.get('id');
}

function getDriveImageId(request) {
  const url = new URL(request.url || '', 'http://localhost');
  const fileId = String(url.searchParams.get('id') || '').trim();
  return /^[A-Za-z0-9_-]{10,}$/.test(fileId) ? fileId : '';
}

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const contentLength = Number.parseInt(request.headers['content-length'] || '0', 10);
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BODY_BYTES) {
    throw clientError('Payload muito grande.', 413);
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_JSON_BODY_BYTES) {
      throw clientError('Payload muito grande.', 413);
    }

    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString('utf8') || '{}';
}

function getSetCookies(upstream) {
  if (typeof upstream.headers.getSetCookie === 'function') {
    return upstream.headers.getSetCookie();
  }

  const cookie = upstream.headers.get('set-cookie');
  return cookie ? [cookie] : [];
}

function rewriteCookieForLocalhost(cookie) {
  return cookie
    .replace(/;\s*Secure/gi, '')
    .replace(/;\s*Domain=[^;]+/gi, '')
    .replace(/;\s*SameSite=None/gi, '; SameSite=Lax');
}

function clearLocalSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`;
}

function getHeader(request, name) {
  const value = request.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value || '';
}

function getExpectedOrigin(request) {
  const host = getHeader(request, 'x-forwarded-host') || getHeader(request, 'host') || 'localhost';
  const forwardedProto = getHeader(request, 'x-forwarded-proto');
  const protocol = forwardedProto || (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https');
  return `${protocol}://${host}`;
}

function isSameOriginRequest(request) {
  const expectedOrigin = getExpectedOrigin(request);
  const origin = getHeader(request, 'origin');
  if (origin && origin !== expectedOrigin) {
    return false;
  }

  const referer = getHeader(request, 'referer');
  if (referer) {
    try {
      if (new URL(referer).origin !== expectedOrigin) {
        return false;
      }
    } catch {
      return false;
    }
  }

  const fetchSite = getHeader(request, 'sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
    return false;
  }

  return true;
}

function getSessionCookieHeader(cookieHeader = '') {
  return String(cookieHeader)
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`)) || '';
}

function clientError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
