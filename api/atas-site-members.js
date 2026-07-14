const ATAS_ORIGIN = process.env.ATAS_API_ORIGIN || 'https://interno.ieeeufjf.com.br';

export default async function handler(request, response) {
  setApiHeaders(response);

  try {
    if (request.method === 'GET') {
      return proxyJson(response, '/api/site-members', { method: 'GET' });
    }

    response.setHeader('Allow', 'GET');
    return response.status(405).json({ detail: 'Metodo nao permitido.' });
  } catch (error) {
    return response.status(error.statusCode || 502).json({
      detail: error.message || 'Nao foi possivel conectar ao sistema de atas.',
    });
  }
}

async function proxyJson(response, pathname, init) {
  const headers = { ...(init.headers || {}) };
  const upstream = await fetch(`${ATAS_ORIGIN}${pathname}`, {
    ...init,
    headers,
  });
  const text = await upstream.text();

  response.status(upstream.status);
  response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
  return response.send(text);
}

function setApiHeaders(response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}
