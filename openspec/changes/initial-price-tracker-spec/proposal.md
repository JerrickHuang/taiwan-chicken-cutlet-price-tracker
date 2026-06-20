## Why

本專案要完成 Web 程式設計期末專題：建立一個以台灣雞排為主題的物價追蹤網站，讓使用者能用自己的關心商品理解體感通膨，而不是只依賴官方 CPI 數字。

雞排是台灣常見庶民小吃，價格從早期約 25 到 50 元，逐步來到近年常見 90 到 120 元，適合用來展示長期物價變化、民生消費壓力與資料視覺化查詢。

## What Changes

- 建立網站標題與主題定位：暫定為「雞排物價觀測站」。
- 定義雞排價格觀測資料模型，支援單一年份與期間資料。
- 支援使用者輸入日期、商品名稱、商品價格，並儲存到 SQLite。
- 支援歷史資料查詢，使用表格呈現所有雞排價格紀錄。
- 支援文字搜尋與年份篩選，讓使用者縮小查詢範圍。
- 支援互動式價格圖表與年份滑桿，展示 1993 到 2026 年雞排價格變化。
- 建立 Express.js Web API，提供前端讀取與新增資料。
- 建立 SQLite 初始資料，匯入 1993 到 2026 年雞排價格觀測資料。
- 加入爬蟲功能作為加分項目，用於抓取或記錄來源網站的最新價格資訊。
- 規劃 Azure App Service 部署需求，讓 Express + SQLite 可在雲端執行。
- 建立 Notion 報告用 Markdown 文件，作為完整教學說明。

## Capabilities

### New Capabilities

- `price-record-management`: 定義雞排價格資料的新增、儲存、讀取與資料欄位規則。
- `price-query-and-filtering`: 定義歷史價格資料的表格呈現、文字搜尋與年份篩選行為。
- `price-visualization`: 定義折線圖、價格摘要與年份滑桿互動行為。
- `crawler-source-capture`: 定義爬蟲功能如何擷取來源資料並保留來源說明。
- `deployment-and-documentation`: 定義 GitHub、Azure App Service 與 Notion 教學文件的交付要求。

### Modified Capabilities

- 無。這是新專案，尚無既有 OpenSpec capability 需要修改。

## Impact

- 前端：新增 HTML、CSS、JavaScript 靜態頁面，使用全台灣正體中文介面。
- 後端：新增 Express.js 伺服器與 REST API。
- 資料庫：新增 SQLite 資料表、初始資料匯入與本機/Azure 資料庫路徑設定。
- 相依套件：預計使用 `express`、`sqlite3`，圖表可使用前端 CDN 或原生 Canvas/SVG 實作；爬蟲可使用 Node.js 內建 `fetch` 或輕量解析方式。
- 部署：GitHub repo 名稱為 `taiwan-chicken-cutlet-price-tracker`，Azure App Service 使用 Node.js 20 LTS 與持久化 `/home/data` SQLite 路徑。
- 文件：產生 OpenSpec 文件與 Notion 可匯入的 Markdown 期末報告。
