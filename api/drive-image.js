export default async function handler(request, response) {
  setImageHeaders(response);

  if (!['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET, HEAD');
    return response.status(405).json({ detail: 'Metodo nao permitido.' });
  }

  try {
    const fileId = getDriveFileId(request.url);
    if (!fileId) {
      return response.status(400).json({ detail: 'Imagem invalida.' });
    }

    const upstream = await fetch(
      `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=view`,
      { cache: 'no-store' },
    );

    if (!upstream.ok) {
      return response.status(upstream.status).json({ detail: 'Imagem indisponivel.' });
    }

    const contentType = upstream.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return response.status(502).json({ detail: 'Arquivo nao e uma imagem publica.' });
    }

    response.setHeader('Content-Type', contentType);
    const contentLength = upstream.headers.get('content-length');
    if (contentLength) {
      response.setHeader('Content-Length', contentLength);
    }

    if (request.method === 'HEAD') {
      return response.status(200).end();
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    return response.status(200).send(buffer);
  } catch (error) {
    return response.status(502).json({
      detail: error.message || 'Nao foi possivel carregar a imagem.',
    });
  }
}

function getDriveFileId(requestUrl) {
  try {
    const url = new URL(requestUrl, 'https://ieeeufjf.com.br');
    const fileId = String(url.searchParams.get('id') || '').trim();
    return /^[A-Za-z0-9_-]{10,}$/.test(fileId) ? fileId : '';
  } catch {
    return '';
  }
}

function setImageHeaders(response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}
