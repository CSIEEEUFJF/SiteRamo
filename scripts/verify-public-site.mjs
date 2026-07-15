const baseUrl = new URL(process.env.SITE_BASE_URL || 'http://127.0.0.1:5173');

const chapterIds = [
  'aess',
  'aps',
  'comsoc',
  'cs',
  'cas',
  'edsoc',
  'ias',
  'pes',
  'ras',
  'sight',
  'vts',
  'wie',
];

const pagePaths = [
  '/',
  '/en',
  '/historia',
  '/en/historia',
  '/projetos',
  '/en/projetos',
  '/oportunidades',
  '/en/oportunidades',
  ...chapterIds.flatMap((chapterId) => [
    `/capitulos/${chapterId}`,
    `/en/capitulos/${chapterId}`,
  ]),
];

const apiChecks = [
  { path: '/api/atas-site-members', arrayKeys: ['members'] },
  { path: '/api/atas-site-projects', arrayKeys: ['projects'] },
  { path: '/api/atas-site-history-photos', arrayKeys: ['photos'] },
  { path: '/api/ieee-opportunities', arrayKeys: ['funding', 'events'] },
];

async function fetchWithTimeout(path, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(new URL(path, baseUrl), {
      headers: { 'User-Agent': 'IEEE-UFJF-public-site-health-check/1.0' },
      redirect: 'follow',
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkPage(path) {
  const startedAt = Date.now();
  const response = await fetchWithTimeout(path);
  const html = await response.text();
  const contentType = response.headers.get('content-type') || '';
  const valid = response.ok && contentType.includes('text/html') && html.includes('id="root"');

  return {
    type: 'page',
    path,
    status: response.status,
    durationMs: Date.now() - startedAt,
    valid,
  };
}

async function checkApi({ path, arrayKeys }) {
  const startedAt = Date.now();
  const response = await fetchWithTimeout(path);
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return {
    type: 'api',
    path,
    status: response.status,
    durationMs: Date.now() - startedAt,
    valid: response.ok && arrayKeys.every((key) => Array.isArray(payload?.[key])),
  };
}

async function runWithConcurrency(tasks, concurrency = 6) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const index = nextIndex;
      nextIndex += 1;

      try {
        results[index] = await tasks[index]();
      } catch (error) {
        results[index] = {
          type: 'unknown',
          path: 'unknown',
          status: 0,
          durationMs: 0,
          valid: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

const tasks = [
  ...pagePaths.map((path) => () => checkPage(path)),
  ...apiChecks.map((check) => () => checkApi(check)),
];
const results = await runWithConcurrency(tasks);
const failures = results.filter((result) => !result.valid);
const slowest = [...results]
  .sort((left, right) => right.durationMs - left.durationMs)
  .slice(0, 5)
  .map(({ path, durationMs }) => ({ path, durationMs }));

console.log(JSON.stringify({
  checkedAt: new Date().toISOString(),
  baseUrl: baseUrl.toString(),
  pageCount: pagePaths.length,
  apiCount: apiChecks.length,
  passed: results.length - failures.length,
  failed: failures.length,
  slowest,
  failures,
}, null, 2));

if (failures.length) {
  process.exitCode = 1;
}
