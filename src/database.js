const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { validatePriceRecord } = require('./validation');

const isAzure = Boolean(process.env.WEBSITE_SITE_NAME);
const dataDir = isAzure ? '/home/data' : path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'data.db');

const seedRecords = [
  { record_date: '1992-12-31', item_name: '雞排', period: '1993之前', year_start: null, year_end: 1992, price_ntd: 25, price_min_ntd: 25, price_max_ntd: 25, is_estimated: 0, source_ref: 'R1', source_url: 'https://okplaymayday.pixnet.net/blog/post/38108463', note: '1993年以前曾出現一片25元的雞排。' },
  { record_date: '1993-01-01', item_name: '雞排', period: '1993-1995', year_start: 1993, year_end: 1995, price_ntd: 30, price_min_ntd: 30, price_max_ntd: 30, is_estimated: 0, source_ref: 'R1', source_url: 'https://okplaymayday.pixnet.net/blog/post/38108463', note: '1993到1995年間雞排約30元。' },
  { record_date: '1995-01-01', item_name: '雞排', period: '1995-2000', year_start: 1995, year_end: 2000, price_ntd: 35, price_min_ntd: 35, price_max_ntd: 35, is_estimated: 0, source_ref: 'R1', source_url: 'https://okplaymayday.pixnet.net/blog/post/38108463', note: '1995到2000年間雞排約35元。' },
  { record_date: '2000-01-01', item_name: '雞排', period: '2000-2005', year_start: 2000, year_end: 2005, price_ntd: 40, price_min_ntd: 40, price_max_ntd: 40, is_estimated: 0, source_ref: 'R1', source_url: 'https://okplaymayday.pixnet.net/blog/post/38108463', note: '2000到2005年間雞排約40元。' },
  { record_date: '2005-01-01', item_name: '雞排', period: '2005-2008', year_start: 2005, year_end: 2008, price_ntd: 45, price_min_ntd: 45, price_max_ntd: 45, is_estimated: 0, source_ref: 'R1', source_url: 'https://okplaymayday.pixnet.net/blog/post/38108463', note: '2005到2008年間雞排約45元。' },
  { record_date: '2008-01-01', item_name: '雞排', period: '2008-2013', year_start: 2008, year_end: 2013, price_ntd: 50, price_min_ntd: 50, price_max_ntd: 50, is_estimated: 0, source_ref: 'R1', source_url: 'https://okplaymayday.pixnet.net/blog/post/38108463', note: '2008到2013年間雞排主流價格約50元。' },
  { record_date: '2010-01-01', item_name: '雞排', period: '2010-2013', year_start: 2010, year_end: 2013, price_ntd: 45, price_min_ntd: 40, price_max_ntd: 50, is_estimated: 1, source_ref: 'R2', source_url: 'https://www.setn.com/m/news.aspx?newsid=370428', note: '2018年報導回顧，五年前賣40元，後來漲到50元，推估此段為40到50元過渡期。' },
  { record_date: '2014-01-01', item_name: '雞排', period: '2014', year_start: 2014, year_end: 2014, price_ntd: 58, price_min_ntd: 55, price_max_ntd: 60, is_estimated: 1, source_ref: 'R2', source_url: 'https://www.setn.com/m/news.aspx?newsid=370428', note: '依2018年報導中50元到70、80元的變化推估，2014年約55到60元。' },
  { record_date: '2015-01-01', item_name: '雞排', period: '2015-2017', year_start: 2015, year_end: 2017, price_ntd: 65, price_min_ntd: 60, price_max_ntd: 70, is_estimated: 1, source_ref: 'R2', source_url: 'https://www.setn.com/m/news.aspx?newsid=370428', note: '依2018年漲到70、80元的報導內容推估，2015到2017年主流約60到70元。' },
  { record_date: '2018-01-01', item_name: '雞排', period: '2018', year_start: 2018, year_end: 2018, price_ntd: 75, price_min_ntd: 70, price_max_ntd: 80, is_estimated: 0, source_ref: 'R2', source_url: 'https://www.setn.com/m/news.aspx?newsid=370428', note: '2018年報導指出雞排從50元漲到70、80元，最貴可到80元。' },
  { record_date: '2021-01-01', item_name: '雞排-平價連鎖', period: '2021-2022_平價連鎖', year_start: 2021, year_end: 2022, price_ntd: 75, price_min_ntd: 70, price_max_ntd: 80, is_estimated: 0, source_ref: 'R3', source_url: 'https://www.foodnext.net/news/newstrack/paper/5616709367', note: '派克雞排從70元調到75元，雙北多數門市約80元。' },
  { record_date: '2021-01-01', item_name: '雞排-熱門品牌', period: '2021-2022_熱門品牌', year_start: 2021, year_end: 2022, price_ntd: 92, price_min_ntd: 90, price_max_ntd: 95, is_estimated: 0, source_ref: 'R4', source_url: 'https://www.mirrormedia.mg/story/20220607edi007', note: '艋舺雞排部分門市單片90元，外送平台95元。' },
  { record_date: '2023-01-01', item_name: '雞排-一般店家', period: '2023-2024_一般店家', year_start: 2023, year_end: 2024, price_ntd: 85, price_min_ntd: 80, price_max_ntd: 90, is_estimated: 1, source_ref: 'R4', source_url: 'https://www.mirrormedia.mg/story/20220607edi007', note: '依2022年90到95元與後續報導脈絡推估，2023到2024年一般店家約80到90元。' },
  { record_date: '2023-01-01', item_name: '雞排-連鎖高租金區', period: '2023-2024_連鎖高租金區', year_start: 2023, year_end: 2024, price_ntd: 100, price_min_ntd: 90, price_max_ntd: 105, is_estimated: 0, source_ref: 'R5', source_url: 'https://today.line.me/tw/v3/article/qoBWvrk', note: '台北內湖連鎖雞排店出現一片105元的案例。' },
  { record_date: '2025-01-01', item_name: '雞排-老店', period: '2025-2026_老店', year_start: 2025, year_end: 2026, price_ntd: 99, price_min_ntd: 99, price_max_ntd: 99, is_estimated: 0, source_ref: 'R6', source_url: 'https://www.youtube.com/watch?v=c-UMNQyOKkE', note: '新北三重超過50年的老店雞排漲到99元。' },
  { record_date: '2025-01-01', item_name: '雞排-熱門商圈', period: '2025-2026_熱門商圈', year_start: 2025, year_end: 2026, price_ntd: 105, price_min_ntd: 90, price_max_ntd: 120, is_estimated: 0, source_ref: 'R7', source_url: 'https://www.youtube.com/watch?v=1800FlOTit4', note: '西門町等熱門商圈雞排約90到120元，部分店家出現120元案例。' }
];

function ensureDataDir() {
  fs.mkdirSync(dataDir, { recursive: true });
}

function openDatabase() {
  ensureDataDir();
  return new sqlite3.Database(dbPath);
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function close(db) {
  return new Promise((resolve, reject) => {
    db.close(error => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function createSchema(db) {
  await run(db, `
    CREATE TABLE IF NOT EXISTS price_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      record_date TEXT NOT NULL,
      item_name TEXT NOT NULL,
      period TEXT NOT NULL,
      year_start INTEGER,
      year_end INTEGER,
      price_ntd INTEGER NOT NULL,
      price_min_ntd INTEGER,
      price_max_ntd INTEGER,
      is_estimated INTEGER NOT NULL DEFAULT 0,
      source_ref TEXT NOT NULL DEFAULT 'USER',
      source_url TEXT DEFAULT '',
      note TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function insertPriceRecord(db, input) {
  const validation = validatePriceRecord(input);

  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    error.details = validation.errors;
    throw error;
  }

  const record = validation.record;
  const result = await run(
    db,
    `
      INSERT INTO price_records (
        record_date,
        item_name,
        period,
        year_start,
        year_end,
        price_ntd,
        price_min_ntd,
        price_max_ntd,
        is_estimated,
        source_ref,
        source_url,
        note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      record.record_date,
      record.item_name,
      record.period,
      record.year_start,
      record.year_end,
      record.price_ntd,
      record.price_min_ntd,
      record.price_max_ntd,
      record.is_estimated,
      record.source_ref,
      record.source_url,
      record.note
    ]
  );

  return get(db, 'SELECT * FROM price_records WHERE id = ?', [result.id]);
}

async function seedIfEmpty(db) {
  const row = await get(db, 'SELECT COUNT(*) AS count FROM price_records');

  if (row.count > 0) {
    return { inserted: 0, skipped: true };
  }

  for (const record of seedRecords) {
    await insertPriceRecord(db, record);
  }

  return { inserted: seedRecords.length, skipped: false };
}

async function initDatabase() {
  const db = openDatabase();
  await createSchema(db);
  await seedIfEmpty(db);
  return db;
}

module.exports = {
  all,
  close,
  dbPath,
  get,
  initDatabase,
  insertPriceRecord,
  isAzure,
  openDatabase,
  run,
  seedIfEmpty,
  seedRecords
};
