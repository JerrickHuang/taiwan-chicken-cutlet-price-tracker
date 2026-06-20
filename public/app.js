const state = {
  records: [],
  summary: null,
  selectedYear: 2026
};

const els = {
  form: document.querySelector('#price-form'),
  formMessage: document.querySelector('#form-message'),
  recordsBody: document.querySelector('#records-body'),
  searchInput: document.querySelector('#search-input'),
  selectedYear: document.querySelector('#selected-year'),
  yearSlider: document.querySelector('#year-slider'),
  yearResults: document.querySelector('#year-results'),
  summaryGrid: document.querySelector('#summary-grid'),
  chart: document.querySelector('#price-chart')
};

els.crawlerForm = document.querySelector('#crawler-form');
els.crawlerUrl = document.querySelector('#crawler-url');
els.crawlerResult = document.querySelector('#crawler-result');

function formatPrice(value) {
  return Number.isFinite(Number(value)) ? `NT$${Number(value).toLocaleString('zh-TW')}` : '-';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || '資料讀取失敗。');
  }

  return data;
}

async function loadData() {
  const query = els.searchInput.value.trim();
  const url = query ? `/api/prices?q=${encodeURIComponent(query)}` : '/api/prices';
  const [{ records }, { summary }] = await Promise.all([
    fetchJson(url),
    fetchJson('/api/prices/summary')
  ]);

  state.records = records;
  state.summary = summary;
  renderAll();
}

function renderAll() {
  renderSummary();
  renderTable();
  renderYearResults();
  drawChart();
}

function renderSummary() {
  const summary = state.summary || {};
  const values = [
    { label: '資料筆數', value: `${summary.record_count ?? 0} 筆` },
    { label: '最低價格', value: formatPrice(summary.min_price_ntd) },
    { label: '最高價格', value: formatPrice(summary.max_price_ntd) },
    { label: '平均價格', value: formatPrice(summary.average_price_ntd) }
  ];

  els.summaryGrid.innerHTML = values.map(item => `
    <div class="stat-card">
      <span class="stat-label">${item.label}</span>
      <strong class="stat-value">${item.value}</strong>
    </div>
  `).join('');
}

function renderTable() {
  if (state.records.length === 0) {
    els.recordsBody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">目前沒有符合條件的雞排價格資料。</td>
      </tr>
    `;
    return;
  }

  els.recordsBody.innerHTML = state.records.map(record => {
    const source = record.source_url
      ? `<a href="${escapeHtml(record.source_url)}" target="_blank" rel="noreferrer">${escapeHtml(record.source_ref)}</a>`
      : escapeHtml(record.source_ref);

    return `
      <tr>
        <td>${escapeHtml(record.period)}</td>
        <td>${escapeHtml(record.item_name)}</td>
        <td class="price">${formatPrice(record.price_ntd)}</td>
        <td>${formatPrice(record.price_min_ntd)} - ${formatPrice(record.price_max_ntd)}</td>
        <td><span class="tag ${record.is_estimated ? 'estimated' : ''}">${record.is_estimated ? '推估' : '來源紀錄'}</span></td>
        <td>${source}</td>
        <td>${escapeHtml(record.note)}</td>
      </tr>
    `;
  }).join('');
}

function recordMatchesYear(record, year) {
  const start = record.year_start ?? record.year_end;
  const end = record.year_end ?? record.year_start;
  return Number.isFinite(start) && Number.isFinite(end) && year >= start && year <= end;
}

function renderYearResults() {
  const year = Number(els.yearSlider.value);
  state.selectedYear = year;
  els.selectedYear.textContent = year;

  const matches = state.records.filter(record => recordMatchesYear(record, year));

  if (matches.length === 0) {
    els.yearResults.innerHTML = '<p class="empty-state">這一年目前沒有對應的雞排價格紀錄。</p>';
    return;
  }

  els.yearResults.innerHTML = matches.map(record => `
    <article class="year-item">
      <strong>${escapeHtml(record.period)}｜${escapeHtml(record.item_name)}</strong>
      <span>${formatPrice(record.price_ntd)}，區間 ${formatPrice(record.price_min_ntd)} - ${formatPrice(record.price_max_ntd)}</span>
      <span class="tag ${record.is_estimated ? 'estimated' : ''}">${record.is_estimated ? '推估資料' : '來源紀錄'}</span>
    </article>
  `).join('');
}

function buildYearPoints() {
  const buckets = new Map();

  state.records.forEach(record => {
    const start = record.year_start ?? record.year_end;
    const end = record.year_end ?? record.year_start;

    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      return;
    }

    for (let year = Math.max(1993, start); year <= Math.min(2026, end); year += 1) {
      if (!buckets.has(year)) {
        buckets.set(year, []);
      }
      buckets.get(year).push(Number(record.price_ntd));
    }
  });

  return [...buckets.entries()].map(([year, prices]) => ({
    year,
    price: prices.reduce((sum, price) => sum + price, 0) / prices.length
  })).sort((a, b) => a.year - b.year);
}

function drawChart() {
  const canvas = els.chart;
  const ctx = canvas.getContext('2d');
  const points = buildYearPoints();
  const width = canvas.width;
  const height = canvas.height;
  const padding = { top: 32, right: 36, bottom: 54, left: 64 };

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  if (points.length === 0) {
    ctx.fillStyle = '#65758b';
    ctx.font = '24px sans-serif';
    ctx.fillText('目前沒有可繪製的價格資料。', padding.left, height / 2);
    return;
  }

  const minYear = 1993;
  const maxYear = 2026;
  const maxPrice = Math.max(...points.map(point => point.price), 120);
  const minPrice = 20;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const x = year => padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth;
  const y = price => padding.top + (1 - ((price - minPrice) / (maxPrice - minPrice))) * innerHeight;

  ctx.strokeStyle = '#d9e2ec';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#65758b';
  ctx.font = '18px sans-serif';

  for (let price = 20; price <= maxPrice; price += 20) {
    const yy = y(price);
    ctx.beginPath();
    ctx.moveTo(padding.left, yy);
    ctx.lineTo(width - padding.right, yy);
    ctx.stroke();
    ctx.fillText(`${price}`, 18, yy + 6);
  }

  [1993, 2000, 2008, 2014, 2018, 2022, 2026].forEach(year => {
    const xx = x(year);
    ctx.fillText(`${year}`, xx - 20, height - 18);
  });

  ctx.strokeStyle = '#d94f30';
  ctx.lineWidth = 4;
  ctx.beginPath();
  points.forEach((point, index) => {
    const xx = x(point.year);
    const yy = y(point.price);
    if (index === 0) {
      ctx.moveTo(xx, yy);
    } else {
      ctx.lineTo(xx, yy);
    }
  });
  ctx.stroke();

  points.forEach(point => {
    ctx.beginPath();
    ctx.fillStyle = point.year === state.selectedYear ? '#167c80' : '#f2b84b';
    ctx.arc(x(point.year), y(point.price), point.year === state.selectedYear ? 7 : 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#1f2933';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('價格 NT$', 18, 28);
}

async function handleSubmit(event) {
  event.preventDefault();
  els.formMessage.classList.remove('error');
  els.formMessage.textContent = '新增中...';

  const formData = new FormData(els.form);
  const payload = Object.fromEntries(formData.entries());

  try {
    await fetchJson('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    els.form.reset();
    document.querySelector('#item-name').value = '雞排';
    els.formMessage.textContent = '已新增價格紀錄。';
    await loadData();
  } catch (error) {
    els.formMessage.classList.add('error');
    els.formMessage.textContent = error.message;
  }
}

async function handleCrawlerSubmit(event) {
  event.preventDefault();
  els.crawlerResult.classList.remove('error');
  els.crawlerResult.textContent = '正在讀取來源頁面...';

  try {
    const { result } = await fetchJson('/api/crawl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: els.crawlerUrl.value })
    });

    els.crawlerResult.innerHTML = `
      <strong>${escapeHtml(result.title)}</strong><br>
      狀態碼：${escapeHtml(result.status)}｜讀取時間：${escapeHtml(new Date(result.fetched_at).toLocaleString('zh-TW'))}<br>
      <a href="${escapeHtml(result.url)}" target="_blank" rel="noreferrer">開啟來源頁面</a>
    `;
  } catch (error) {
    els.crawlerResult.classList.add('error');
    els.crawlerResult.textContent = error.message;
  }
}

function bindEvents() {
  els.form.addEventListener('submit', handleSubmit);
  els.crawlerForm.addEventListener('submit', handleCrawlerSubmit);
  els.searchInput.addEventListener('input', () => {
    window.clearTimeout(bindEvents.searchTimer);
    bindEvents.searchTimer = window.setTimeout(loadData, 220);
  });
  els.yearSlider.addEventListener('input', () => {
    renderYearResults();
    drawChart();
  });
}

bindEvents();
loadData().catch(error => {
  els.formMessage.classList.add('error');
  els.formMessage.textContent = error.message;
});
