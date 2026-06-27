const ATAS_ORIGIN = process.env.ATAS_API_ORIGIN || 'https://atas.ieeeufjf.com.br';
const SESSION_COOKIE = 'atas_ieee_session';
const MAX_JSON_BODY_BYTES = 64 * 1024;

export default async function handler(request, response) {
  setApiHeaders(response);

  try {
    if (request.method === 'GET') {
      return proxyJson(request, response, '/api/auth/me', { method: 'GET' });
    }

    if (request.method === 'POST') {
      if (!isSameOriginRequest(request)) {
        return response.status(403).json({ detail: 'Origem invalida.' });
      }

      const body = await readJson(request);
      return proxyJson(request, response, '/api/auth/login', {
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
    }

    if (request.method === 'DELETE') {
      if (!isSameOriginRequest(request)) {
        return response.status(403).json({ detail: 'Origem invalida.' });
      }

      await proxyFetch(request, '/api/auth/logout', { method: 'POST' });
      response.setHeader('Set-Cookie', clearSessionCookie());
      return response.status(200).json({ ok: true });
    }

    response.setHeader('Allow', 'GET, POST, DELETE');
    return response.status(405).json({ detail: 'Metodo nao permitido.' });
  } catch (error) {
    return response.status(error.statusCode || 502).json({
      detail: error.message || 'Nao foi possivel conectar ao sistema de atas.',
    });
  }
}

async function proxyJson(request, response, pathname, init) {
  const upstream = await proxyFetch(request, pathname, init);
  const text = await upstream.text();
  const contentType = upstream.headers.get('content-type') || 'application/json';
  const setCookies = getSetCookies(upstream);

  response.status(upstream.status);
  response.setHeader('Content-Type', contentType);
  if (setCookies.length) {
    response.setHeader('Set-Cookie', setCookies);
  }
  return response.send(text);
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

async function readJson(request) {
  assertJsonBodySize(request);

  if (request.body && typeof request.body === 'object') {
    return request.body;
  }

  if (typeof request.body === 'string') {
    return parseJson(request.body || '{}');
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

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? parseJson(rawBody) : {};
}

function getSetCookies(upstream) {
  if (typeof upstream.headers.getSetCookie === 'function') {
    return upstream.headers.getSetCookie();
  }

  const cookie = upstream.headers.get('set-cookie');
  return cookie ? [cookie] : [];
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`;
}

function setApiHeaders(response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
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

function assertJsonBodySize(request) {
  const contentLength = Number.parseInt(getHeader(request, 'content-length') || '0', 10);
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BODY_BYTES) {
    throw clientError('Payload muito grande.', 413);
  }
}

function parseJson(rawBody) {
  try {
    return JSON.parse(rawBody || '{}');
  } catch {
    throw clientError('JSON invalido.', 400);
  }
}

function clientError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
