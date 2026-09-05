import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { loadIeeeOpportunities } from './api/ieee-opportunities.js';
import { seoRoutes } from './scripts/seo-routes.mjs';

const ATAS_ORIGIN = process.env.ATAS_API_ORIGIN || 'https://interno.ieeeufjf.com.br';
const ATAS_SITE_INTEREST_TOKEN = process.env.ATAS_SITE_INTEREST_TOKEN || '';
const SESSION_COOKIE = 'atas_ieee_session';
const MAX_JSON_BODY_BYTES = 64 * 1024;
const DRIVE_IMAGE_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const DRIVE_IMAGE_CACHE_MAX_ITEMS = 120;
const driveImageCache = new Map();

export default defineConfig({
  plugins: [react(), atasAdminProxy()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        en: 'en.html',
        ...Object.fromEntries(
          seoRoutes.map((route) => [
            route.slice(1).replaceAll('/', '-'),
            `${route.slice(1)}/index.html`,
          ]),
        ),
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

      server.middlewares.use('/api/atas-site-interest', async (request, response) => {
        try {
          if (request.method !== 'POST') {
            response.setHeader('Allow', 'POST');
            return sendJson(response, 405, { detail: 'Metodo nao permitido.' });
          }

          if (!isSameOriginRequest(request)) {
            return sendJson(response, 403, { detail: 'Origem invalida.' });
          }

          const body = await readBody(request);
          const headers = {
            'Content-Type': request.headers['content-type'] || 'application/json',
          };
          if (ATAS_SITE_INTEREST_TOKEN) {
            headers.Authorization = `Bearer ${ATAS_SITE_INTEREST_TOKEN}`;
          }
          if (request.headers['x-forwarded-for']) {
            headers['X-Forwarded-For'] = request.headers['x-forwarded-for'];
          }

          return proxyJson(
            request,
            response,
            '/api/site-interest',
            { body, headers, method: 'POST' },
            { local: true },
          );
        } catch (error) {
          return sendJson(response, error.statusCode || 502, {
            detail: error.message || 'Nao foi possivel enviar o interesse ao Sistema Interno.',
          });
        }
      });

      for (const [route, upstreamPath] of [
        ['/api/atas-site-projects', '/api/site-projects'],
        ['/api/atas-site-history-photos', '/api/site-history-photos'],
      ]) {
        server.middlewares.use(route, async (request, response) => {
          try {
            if (request.method === 'GET') {
              return proxyJson(request, response, upstreamPath, { method: 'GET' }, { local: true });
            }

            response.setHeader('Allow', 'GET');
            return sendJson(response, 405, { detail: 'Metodo nao permitido.' });
          } catch (error) {
            return sendJson(response, error.statusCode || 502, {
              detail: error.message || 'Nao foi possivel conectar ao sistema de atas.',
            });
          }
        });
      }

      server.middlewares.use('/api/ieee-opportunities', async (request, response) => {
        try {
          if (request.method === 'GET') {
            return sendJson(response, 200, await loadIeeeOpportunities());
          }

          response.setHeader('Allow', 'GET');
          return sendJson(response, 405, { detail: 'Metodo nao permitido.' });
        } catch (error) {
          return sendJson(response, error.statusCode || 502, {
            detail: error.message || 'Nao foi possivel consultar as oportunidades do IEEE.',
            events: [],
            funding: [],
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

          const cacheKey = getDriveImageCacheKey(request, fileId);
          const cachedImage = getCachedDriveImage(cacheKey);
          if (cachedImage) {
            response.statusCode = 200;
            response.setHeader('X-Image-Cache', 'HIT');
            return sendDriveImage(request, response, cachedImage);
          }

          const upstream = await fetch(
            `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=view`,
            { cache: 'force-cache' },
          );

          if (!upstream.ok) {
            return sendJson(response, upstream.status, { detail: 'Imagem indisponivel.' });
          }

          const contentType = upstream.headers.get('content-type') || '';
          if (!contentType.startsWith('image/')) {
            return sendJson(response, 502, { detail: 'Arquivo nao e uma imagem publica.' });
          }

          const contentLength = upstream.headers.get('content-length');
          const buffer = Buffer.from(await upstream.arrayBuffer());
          const image = {
            buffer,
            contentLength: contentLength || String(buffer.length),
            contentType,
            expiresAt: Date.now() + DRIVE_IMAGE_CACHE_TTL_MS,
          };
          setCachedDriveImage(cacheKey, image);

          response.statusCode = 200;
          response.setHeader('X-Image-Cache', 'MISS');
          return sendDriveImage(request, response, image);
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

function getDriveImageCacheKey(request, fileId) {
  const url = new URL(request.url || '', 'http://localhost');
  return `${fileId}:${url.searchParams.get('v') || 'unversioned'}`;
}

function getCachedDriveImage(cacheKey) {
  const cachedImage = driveImageCache.get(cacheKey);
  if (!cachedImage) {
    return null;
  }

  if (cachedImage.expiresAt <= Date.now()) {
    driveImageCache.delete(cacheKey);
    return null;
  }

  driveImageCache.delete(cacheKey);
  driveImageCache.set(cacheKey, cachedImage);
  return cachedImage;
}

function setCachedDriveImage(cacheKey, image) {
  driveImageCache.set(cacheKey, image);

  while (driveImageCache.size > DRIVE_IMAGE_CACHE_MAX_ITEMS) {
    const oldestKey = driveImageCache.keys().next().value;
    driveImageCache.delete(oldestKey);
  }
}

function sendDriveImage(request, response, image) {
  response.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  response.setHeader('Content-Type', image.contentType);
  response.setHeader('Content-Length', image.contentLength);
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method === 'HEAD') {
    return response.end();
  }

  return response.end(image.buffer);
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
