function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeInteger(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const number = Number(value);
  return Number.isInteger(number) ? number : NaN;
}

function validatePriceRecord(input) {
  const recordDate = normalizeText(input.record_date);
  const itemName = normalizeText(input.item_name);
  const priceNtd = normalizeInteger(input.price_ntd);

  const errors = [];

  if (!recordDate) {
    errors.push('請輸入日期。');
  }

  if (!itemName) {
    errors.push('請輸入商品名稱。');
  }

  if (!Number.isInteger(priceNtd) || priceNtd <= 0) {
    errors.push('請輸入大於 0 的整數價格。');
  }

  const yearStart = normalizeInteger(input.year_start);
  const yearEnd = normalizeInteger(input.year_end);
  const priceMinNtd = normalizeInteger(input.price_min_ntd);
  const priceMaxNtd = normalizeInteger(input.price_max_ntd);

  if (Number.isNaN(yearStart) || Number.isNaN(yearEnd)) {
    errors.push('年份必須是整數。');
  }

  if (Number.isNaN(priceMinNtd) || Number.isNaN(priceMaxNtd)) {
    errors.push('價格區間必須是整數。');
  }

  if (Number.isInteger(yearStart) && Number.isInteger(yearEnd) && yearStart > yearEnd) {
    errors.push('起始年份不可大於結束年份。');
  }

  if (Number.isInteger(priceMinNtd) && Number.isInteger(priceMaxNtd) && priceMinNtd > priceMaxNtd) {
    errors.push('最低價格不可大於最高價格。');
  }

  const normalized = {
    record_date: recordDate,
    item_name: itemName,
    period: normalizeText(input.period) || recordDate,
    year_start: Number.isInteger(yearStart) ? yearStart : Number(recordDate.slice(0, 4)) || null,
    year_end: Number.isInteger(yearEnd) ? yearEnd : Number(recordDate.slice(0, 4)) || null,
    price_ntd: priceNtd,
    price_min_ntd: Number.isInteger(priceMinNtd) ? priceMinNtd : priceNtd,
    price_max_ntd: Number.isInteger(priceMaxNtd) ? priceMaxNtd : priceNtd,
    is_estimated: input.is_estimated ? 1 : 0,
    source_ref: normalizeText(input.source_ref) || 'USER',
    source_url: normalizeText(input.source_url),
    note: normalizeText(input.note)
  };

  return {
    isValid: errors.length === 0,
    errors,
    record: normalized
  };
}

module.exports = {
  validatePriceRecord
};
