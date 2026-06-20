const express = require('express');
const path = require('path');
const {
  all,
  dbPath,
  get,
  initDatabase,
  insertPriceRecord,
  isAzure
} = require('./src/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function parseIntegerQuery(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const number = Number(value);
  return Number.isInteger(number) ? number : NaN;
}

function createApiError(message, statusCode = 400, details = []) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

function buildPriceQuery(query) {
  const conditions = [];
  const params = [];
  const text = typeof query.q === 'string' ? query.q.trim() : '';
  const year = parseIntegerQuery(query.year);
  const estimated = parseIntegerQuery(query.estimated);

  if (Number.isNaN(year)) {
    throw createApiError('年份篩選必須是整數。');
  }

  if (Number.isNaN(estimated) || (estimated !== null && estimated !== 0 && estimated !== 1)) {
    throw createApiError('推估篩選只能是 0 或 1。');
  }

  if (text) {
    conditions.push(`(
      item_name LIKE ?
      OR period LIKE ?
      OR source_ref LIKE ?
      OR note LIKE ?
    )`);
    const keyword = `%${text}%`;
    params.push(keyword, keyword, keyword, keyword);
  }

  if (year !== null) {
    conditions.push(`(
      (year_start IS NULL AND year_end IS NOT NULL AND ? <= year_end)
      OR (year_start IS NOT NULL AND year_end IS NULL AND ? >= year_start)
      OR (year_start IS NOT NULL AND year_end IS NOT NULL AND ? BETWEEN year_start AND year_end)
    )`);
    params.push(year, year, year);
  }

  if (estimated !== null) {
    conditions.push('is_estimated = ?');
    params.push(estimated);
  }

  return {
    where: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params
  };
}

function registerRoutes(db) {
  app.get('/api/health', (req, res) => {
    res.json({
      ok: true,
      app: '雞排物價觀測站',
      environment: isAzure ? 'azure' : 'local',
      database: dbPath
    });
  });

  app.get('/api/prices', async (req, res, next) => {
    try {
      const { where, params } = buildPriceQuery(req.query);
      const records = await all(
        db,
        `
          SELECT *
          FROM price_records
          ${where}
          ORDER BY COALESCE(year_start, year_end), id
        `,
        params
      );

      res.json({ records });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/prices', async (req, res, next) => {
    try {
      const record = await insertPriceRecord(db, req.body);
      res.status(201).json({ record });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/prices/summary', async (req, res, next) => {
    try {
      const summary = await get(
        db,
        `
          SELECT
            COUNT(*) AS record_count,
            MIN(price_ntd) AS min_price_ntd,
            MAX(price_ntd) AS max_price_ntd,
            ROUND(AVG(price_ntd), 1) AS average_price_ntd,
            MIN(COALESCE(year_start, year_end)) AS year_min,
            MAX(COALESCE(year_end, year_start)) AS year_max
          FROM price_records
        `
      );

      res.json({ summary });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/sources', async (req, res, next) => {
    try {
      const sources = await all(
        db,
        `
          SELECT
            source_ref,
            source_url,
            COUNT(*) AS record_count,
            MIN(COALESCE(year_start, year_end)) AS year_min,
            MAX(COALESCE(year_end, year_start)) AS year_max
          FROM price_records
          WHERE source_ref != ''
          GROUP BY source_ref, source_url
          ORDER BY source_ref
        `
      );

      res.json({ sources });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/crawl', async (req, res, next) => {
    try {
      const targetUrl = typeof req.body.url === 'string' ? req.body.url.trim() : '';

      if (!targetUrl) {
        throw createApiError('請輸入要爬取的來源網址。');
      }

      let parsedUrl;
      try {
        parsedUrl = new URL(targetUrl);
      } catch (_error) {
        throw createApiError('來源網址格式不正確。');
      }

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw createApiError('爬蟲示範只支援 http 或 https 網址。');
      }

      const startedAt = new Date();
      const response = await fetch(parsedUrl.href, {
        headers: {
          'User-Agent': 'chicken-cutlet-price-tracker/0.1 educational crawler'
        }
      });
      const html = await response.text();
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch
        ? titleMatch[1].replace(/\s+/g, ' ').trim()
        : '未讀取到頁面標題';

      res.json({
        result: {
          url: parsedUrl.href,
          status: response.status,
          ok: response.ok,
          title,
          fetched_at: startedAt.toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  });
}

function registerErrorHandling() {
  app.use((req, res) => {
    res.status(404).json({
      error: '找不到這個 API 或頁面。',
      path: req.path
    });
  });

  app.use((error, req, res, _next) => {
    const statusCode = error.statusCode || 500;
    const message = statusCode >= 500 ? '伺服器發生錯誤，請稍後再試。' : error.message;

    if (statusCode >= 500) {
      console.error(error);
    }

    res.status(statusCode).json({
      error: message,
      details: error.details || []
    });
  });
}

async function start() {
  const db = await initDatabase();
  registerRoutes(db);
  registerErrorHandling();

  app.listen(PORT, () => {
    console.log(`雞排物價觀測站 running on http://localhost:${PORT}`);
    console.log(`SQLite database: ${dbPath}`);
  });
}

start().catch(error => {
  console.error('啟動失敗：', error);
  process.exit(1);
});
