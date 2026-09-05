const IMAGE_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const IMAGE_CACHE_MAX_ITEMS = 120;
const imageCache = globalThis.__ieeeDriveImageCache || new Map();
globalThis.__ieeeDriveImageCache = imageCache;

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

    const cacheKey = getImageCacheKey(request.url, fileId);
    const cachedImage = getCachedImage(cacheKey);
    if (cachedImage) {
      response.setHeader('X-Image-Cache', 'HIT');
      return sendImage(request, response, cachedImage);
    }

    const upstream = await fetch(
      `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=view`,
      { cache: 'force-cache' },
    );

    if (!upstream.ok) {
      return response.status(upstream.status).json({ detail: 'Imagem indisponivel.' });
    }

    const contentType = upstream.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return response.status(502).json({ detail: 'Arquivo nao e uma imagem publica.' });
    }

    const contentLength = upstream.headers.get('content-length');
    const buffer = Buffer.from(await upstream.arrayBuffer());
    const image = {
      buffer,
      contentLength: contentLength || String(buffer.length),
      contentType,
      expiresAt: Date.now() + IMAGE_CACHE_TTL_MS,
    };
    setCachedImage(cacheKey, image);

    response.setHeader('X-Image-Cache', 'MISS');
    return sendImage(request, response, image);
  } catch (error) {
    return response.status(502).json({
      detail: error.message || 'Nao foi possivel carregar a imagem.',
    });
  }
}

function getImageCacheKey(requestUrl, fileId) {
  try {
    const url = new URL(requestUrl, 'https://ieeeufjf.com.br');
    return `${fileId}:${url.searchParams.get('v') || 'unversioned'}`;
  } catch {
    return `${fileId}:unversioned`;
  }
}

function getCachedImage(cacheKey) {
  const cachedImage = imageCache.get(cacheKey);
  if (!cachedImage) {
    return null;
  }

  if (cachedImage.expiresAt <= Date.now()) {
    imageCache.delete(cacheKey);
    return null;
  }

  imageCache.delete(cacheKey);
  imageCache.set(cacheKey, cachedImage);
  return cachedImage;
}

function setCachedImage(cacheKey, image) {
  imageCache.set(cacheKey, image);

  while (imageCache.size > IMAGE_CACHE_MAX_ITEMS) {
    const oldestKey = imageCache.keys().next().value;
    imageCache.delete(oldestKey);
  }
}

function sendImage(request, response, image) {
  response.setHeader('Content-Type', image.contentType);
  response.setHeader('Content-Length', image.contentLength);

  if (request.method === 'HEAD') {
    return response.status(200).end();
  }

  return response.status(200).send(image.buffer);
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
  response.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  response.setHeader('CDN-Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=2592000');
  response.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=2592000');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}
