import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ATAS_ORIGIN = process.env.ATAS_API_ORIGIN || 'https://atas.ieeeufjf.com.br';
const SESSION_COOKIE = 'atas_ieee_session';
const MAX_JSON_BODY_BYTES = 64 * 1024;

export default defineConfig({
  plugins: [react(), atasAdminProxy()],
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
            return proxyJson(request, response, '/api/site-members/manage', { method: 'GET' }, { local: true });
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
