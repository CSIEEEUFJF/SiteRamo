const IEEE_STUDENTS_API_ORIGIN = process.env.IEEE_STUDENTS_API_ORIGIN
  || 'https://students.ieee.org';
const IEEE_R9_API_ORIGIN = process.env.IEEE_R9_API_ORIGIN
  || 'https://r9.ieee.org';

const CACHE_CONTROL = 'public, s-maxage=1800, stale-while-revalidate=86400';
const FETCH_TIMEOUT_MS = 7000;
const FUNDING_CATEGORY_IDS = [7, 9, 10, 11, 12, 43];

const FUNDING_CATEGORY_BY_ID = {
  7: 'award',
  9: 'scholarship',
  10: 'fellowship',
  11: 'grant',
  12: 'funding',
  43: 'travelGrant',
};

export default async function handler(request, response) {
  setApiHeaders(response);

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ detail: 'Metodo nao permitido.' });
  }

  try {
    const payload = await loadIeeeOpportunities();
    return response.status(200).json(payload);
  } catch (error) {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Vercel-CDN-Cache-Control', 'no-store');
    return response.status(error.statusCode || 502).json({
      detail: error.message || 'Nao foi possivel consultar as oportunidades do IEEE.',
      funding: [],
      events: [],
    });
  }
}

export async function loadIeeeOpportunities({
  fetchImpl = fetch,
  now = new Date(),
} = {}) {
  const [fundingResult, eventsResult] = await Promise.allSettled([
    loadFundingOpportunities(fetchImpl),
    loadRegionEvents(fetchImpl, now),
  ]);

  const funding = fundingResult.status === 'fulfilled' ? fundingResult.value : [];
  const events = eventsResult.status === 'fulfilled' ? eventsResult.value : [];
  const unavailableSources = [];

  if (fundingResult.status === 'rejected') {
    unavailableSources.push('ieee-students');
  }

  if (eventsResult.status === 'rejected') {
    unavailableSources.push('ieee-region-9');
  }

  if (!funding.length && !events.length && unavailableSources.length === 2) {
    const error = new Error('As fontes oficiais do IEEE estao temporariamente indisponiveis.');
    error.statusCode = 502;
    throw error;
  }

  return {
    funding,
    events,
    generatedAt: now.toISOString(),
    partial: unavailableSources.length > 0,
    unavailableSources,
    sources: [
      {
        id: 'ieee-students',
        name: 'IEEE Students',
        url: 'https://students.ieee.org/student-opportunities/',
      },
      {
        id: 'ieee-region-9',
        name: 'IEEE Region 9',
        url: 'https://r9.ieee.org/events/',
      },
    ],
  };
}

async function loadFundingOpportunities(fetchImpl) {
  const url = new URL('/wp-json/wp/v2/posts', IEEE_STUDENTS_API_ORIGIN);
  url.searchParams.set('categories', FUNDING_CATEGORY_IDS.join(','));
  url.searchParams.set('per_page', '24');
  url.searchParams.set('orderby', 'modified');
  url.searchParams.set('order', 'desc');
  url.searchParams.set(
    '_fields',
    'id,date_gmt,modified_gmt,link,title,categories,yoast_head_json',
  );

  const payload = await fetchJson(fetchImpl, url);
  if (!Array.isArray(payload)) {
    throw new Error('Formato inesperado recebido do IEEE Students.');
  }

  const opportunities = payload
    .map(normalizeFundingOpportunity)
    .filter(Boolean);

  return selectFundingHighlights(opportunities, 6);
}

async function loadRegionEvents(fetchImpl, now) {
  const url = new URL('/wp-json/tribe/events/v1/events', IEEE_R9_API_ORIGIN);
  const endDate = new Date(now);
  endDate.setUTCDate(endDate.getUTCDate() + 90);

  url.searchParams.set('per_page', '24');
  url.searchParams.set('start_date', `${now.toISOString().slice(0, 10)} 00:00:00`);
  url.searchParams.set('end_date', `${endDate.toISOString().slice(0, 10)} 23:59:59`);

  const payload = await fetchJson(fetchImpl, url);
  if (!Array.isArray(payload?.events)) {
    throw new Error('Formato inesperado recebido do IEEE Region 9.');
  }

  return payload.events
    .map(normalizeRegionEvent)
    .filter((event) => event && new Date(event.endsAt || event.startsAt) > now)
    .sort((left, right) => new Date(left.startsAt) - new Date(right.startsAt))
    .slice(0, 6);
}

function normalizeFundingOpportunity(post) {
  const title = cleanText(post?.title?.rendered);
  const url = normalizeOfficialUrl(post?.link, ['students.ieee.org']);

  if (!post?.id || !title || !url) {
    return null;
  }

  return {
    id: `funding-${post.id}`,
    type: 'funding',
    category: classifyFundingOpportunity(post.categories, title),
    title,
    description: truncateText(cleanText(post?.yoast_head_json?.og_description), 240),
    url,
    publishedAt: normalizeUtcDate(post.modified_gmt || post.date_gmt),
    source: 'IEEE Students',
  };
}

function normalizeRegionEvent(event) {
  const title = cleanText(event?.title);
  const startsAt = normalizeWordPressUtcDate(event?.utc_start_date);
  const endsAt = normalizeWordPressUtcDate(event?.utc_end_date) || startsAt;
  const detailsUrl = normalizeOfficialUrl(event?.website, [
    'events.vtools.ieee.org',
    'r9.ieee.org',
  ]) || normalizeOfficialUrl(event?.url, ['r9.ieee.org']);

  if (!event?.id || !title || !startsAt || !detailsUrl) {
    return null;
  }

  const venue = cleanText(event?.venue?.venue);
  const hasVirtualVenue = /^virtual\b/i.test(venue);
  const hasVirtualDetails = /(?:^|,\s*)Virtual:/i.test(venue);
  const isVirtual = Boolean(event?.is_virtual) || hasVirtualVenue;
  const isHybrid = !isVirtual && (Boolean(event?.virtual_url) || hasVirtualDetails);
  const physicalVenue = cleanText(
    venue.replace(/,?\s*Virtual:\s*https?:\/\/\S+.*/i, ''),
  );

  return {
    id: `event-${event.id}`,
    type: 'event',
    category: 'event',
    title,
    description: truncateText(cleanText(event?.excerpt || event?.description), 220),
    url: detailsUrl,
    startsAt,
    endsAt,
    format: isHybrid ? 'hybrid' : (isVirtual ? 'virtual' : 'inPerson'),
    location: isVirtual ? null : truncateText(physicalVenue, 140),
    source: 'IEEE Region 9',
  };
}

function selectFundingHighlights(opportunities, limit) {
  const selected = [];
  const selectedIds = new Set();
  const representedCategories = new Set();

  for (const opportunity of opportunities) {
    if (!representedCategories.has(opportunity.category)) {
      selected.push(opportunity);
      selectedIds.add(opportunity.id);
      representedCategories.add(opportunity.category);
    }

    if (selected.length === limit) {
      return selected;
    }
  }

  for (const opportunity of opportunities) {
    if (!selectedIds.has(opportunity.id)) {
      selected.push(opportunity);
    }

    if (selected.length === limit) {
      break;
    }
  }

  return selected;
}

function classifyFundingOpportunity(categories, title) {
  if (/travel grant/i.test(title)) {
    return 'travelGrant';
  }

  if (/scholarship/i.test(title)) {
    return 'scholarship';
  }

  if (/fellowship/i.test(title)) {
    return 'fellowship';
  }

  const categoryIds = Array.isArray(categories) ? categories : [];
  const preferredId = [43, 9, 10, 11, 12, 7].find((id) => categoryIds.includes(id));
  return FUNDING_CATEGORY_BY_ID[preferredId] || 'funding';
}

async function fetchJson(fetchImpl, url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'IEEE-UFJF-public-site/1.0',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Fonte IEEE respondeu com status ${response.status}.`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeOfficialUrl(value, allowedHosts) {
  try {
    const url = new URL(String(value || ''));
    return url.protocol === 'https:' && allowedHosts.includes(url.hostname)
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function normalizeUtcDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}Z`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normalizeWordPressUtcDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${String(value).replace(' ', 'T')}Z`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function cleanText(value) {
  return decodeHtmlEntities(String(value || '').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtmlEntities(value) {
  const namedEntities = {
    amp: '&',
    apos: "'",
    gt: '>',
    hellip: '...',
    laquo: '"',
    lt: '<',
    mdash: '-',
    nbsp: ' ',
    ndash: '-',
    quot: '"',
    raquo: '"',
    rsquo: "'",
  };

  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => safeCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => safeCodePoint(parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (entity, name) => namedEntities[name.toLowerCase()] ?? entity);
}

function safeCodePoint(value) {
  return Number.isInteger(value) && value >= 0 && value <= 0x10ffff
    ? String.fromCodePoint(value)
    : '';
}

function truncateText(value, maxLength) {
  if (!value || value.length <= maxLength) {
    return value || '';
  }

  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function setApiHeaders(response) {
  response.setHeader('Cache-Control', CACHE_CONTROL);
  response.setHeader('Vercel-CDN-Cache-Control', CACHE_CONTROL);
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}
