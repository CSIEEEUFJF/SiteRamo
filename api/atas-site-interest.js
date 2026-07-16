const ATAS_ORIGIN = process.env.ATAS_API_ORIGIN || 'https://interno.ieeeufjf.com.br';
const REQUEST_TIMEOUT_MS = 15000;
const MAX_JSON_BODY_BYTES = 16 * 1024;

export default async function handler(request, response) {
  setApiHeaders(response);

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ detail: 'Metodo nao permitido.' });
  }

  if (!isSameOriginRequest(request)) {
    return response.status(403).json({ detail: 'Origem invalida.' });
  }

  try {
    const body = normalizeBody(request.body);
    const serializedBody = JSON.stringify(body);
    if (Buffer.byteLength(serializedBody, 'utf8') > MAX_JSON_BODY_BYTES) {
      return response.status(413).json({ detail: 'Payload muito grande.' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let upstream;

    try {
      const headers = { 'Content-Type': 'application/json' };
      const clientIp = getHeader(request, 'x-forwarded-for') || getHeader(request, 'x-real-ip');
      if (clientIp) {
        headers['X-Forwarded-For'] = clientIp;
      }
      if (process.env.ATAS_SITE_INTEREST_TOKEN) {
        headers.Authorization = `Bearer ${process.env.ATAS_SITE_INTEREST_TOKEN}`;
      }

      upstream = await fetch(`${ATAS_ORIGIN}/api/site-interest`, {
        body: serializedBody,
        headers,
        method: 'POST',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const text = await upstream.text();
    response.status(upstream.status);
    response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return response.send(text);
  } catch (error) {
    const timedOut = error.name === 'AbortError';
    return response.status(timedOut ? 504 : 502).json({
      detail: timedOut
        ? 'O Sistema Interno demorou para responder.'
        : error.message || 'Nao foi possivel conectar ao Sistema Interno.',
    });
  }
}

function normalizeBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  if (Buffer.isBuffer(body)) {
    return JSON.parse(body.toString('utf8'));
  }

  return body;
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
  const origin = getHeader(request, 'origin');
  return !origin || origin === getExpectedOrigin(request);
}

function setApiHeaders(response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}
