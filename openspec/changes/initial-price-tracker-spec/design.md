## Context

本專案是 Web 程式設計期末專題，主題為台灣雞排歷年物價變化。評分要求包含前端網頁、Express.js Web API、SQLite 資料庫、OpenSpec 實作紀錄、GitHub 原始碼、Notion 或 HackMD 技術說明文件，並可透過爬蟲與 Azure App Service 部署取得加分。

使用者是想查詢台灣雞排價格變化的一般民眾或同學。網站應該以台灣正體中文呈現，風格現代、輕鬆、符合民生大眾，並使用清楚的圖表、線條、配色與互動操作協助理解長期物價變化。

資料來源是人工整理的 1993 到 2026 年雞排價格觀測資料。每筆資料可能代表單一年份，也可能代表一段期間或特定品牌/地區情境，因此資料模型要支援期間、價格區間、推估註記與來源 URL。

## Goals / Non-Goals

**Goals:**

- 建立可本機執行的 Express + SQLite 物價追蹤網站。
- 前端使用 HTML、CSS、JavaScript，不使用前端框架。
- 後端提供 REST API，支援讀取、新增、搜尋與年份查詢。
- SQLite 儲存雞排價格資料，並匯入 1993 到 2026 年初始資料。
- 使用表格呈現完整歷史資料。
- 使用圖表與年份滑桿呈現價格變化。
- 讓使用者可以輸入日期、商品名稱、商品價格。
- 保留來源、是否推估與備註，讓資料可信度清楚可見。
- 實作簡單爬蟲功能，作為加分與資料來源紀錄示範。
- 支援 Azure App Service 部署，SQLite 在 Azure 使用 `/home/data` 持久化路徑。
- 產出 Notion 可匯入的 Markdown 教學文件。

**Non-Goals:**

- 不做使用者登入、會員權限或後台管理系統。
- 不做付款、地圖定位或即時店家庫存查詢。
- 不保證爬蟲能繞過反爬蟲機制；爬蟲只作為教學示範與公開頁面資料擷取。
- 不建立大型資料分析平台；本專題聚焦在 Web CRUD、查詢、視覺化與部署。
- 不使用 React、Vue、Next.js 等前端框架，避免偏離老師指定的基本架構。

## Decisions

### 1. 專案名稱與網站標題

- Repo 與資料夾名稱使用 `taiwan-chicken-cutlet-price-tracker`。
- 網站標題暫定「雞排物價觀測站」。

理由：英文 repo 名稱清楚描述專案用途；中文網站標題簡短、生活化，符合台灣民生物價主題。

替代方案：`chicken-price-cpi` 較短，但不夠清楚；「雞排通膨追蹤器」較技術化，不如「觀測站」親民。

### 2. 技術架構

- 前端：`public/index.html`、`public/styles.css`、`public/app.js`。
- 後端：`server.js` 使用 Express.js。
- 資料庫：SQLite，使用 `sqlite3` npm 套件。
- 資料初始化：啟動時建立資料表，若資料表為空則匯入初始資料。

理由：完全符合老師要求，也利於同學照著教學文件重現。

替代方案：使用 React 或 ORM 會讓畫面與資料操作更結構化，但對期末作業與教學說明來說複雜度過高。

### 3. SQLite 資料模型

主資料表使用 `price_records`，欄位包含：

- `id`: 主鍵。
- `record_date`: 使用者輸入日期，或由期間資料推導的日期。
- `item_name`: 商品名稱，預設為「雞排」。
- `period`: 顯示用期間，例如 `1993-1995`。
- `year_start`: 起始年份。
- `year_end`: 結束年份。
- `price_ntd`: 代表價格。
- `price_min_ntd`: 最低價格。
- `price_max_ntd`: 最高價格。
- `is_estimated`: 是否為推估資料，0 表示否，1 表示是。
- `source_ref`: 來源代號，例如 `R1`。
- `source_url`: 來源網址。
- `note`: 補充說明。
- `created_at`: 建立時間。

理由：此模型同時支援老師要求的日期、商品名稱、商品價格，也能保留使用者已整理好的期間資料、價格區間與來源可信度。

替代方案：沿用 `chicken_cutlet_prices` 原表名可減少轉換，但缺少 `item_name` 與 `record_date`，較難直接對應作業要求。

### 4. API 設計

預計提供：

- `GET /api/prices`: 取得全部資料，可使用 `q`、`year`、`estimated` 查詢參數。
- `POST /api/prices`: 新增一筆資料，必要欄位為 `record_date`、`item_name`、`price_ntd`。
- `GET /api/prices/summary`: 回傳最高價、最低價、平均價、資料筆數與年份範圍。
- `GET /api/sources`: 回傳來源列表。
- `POST /api/crawl`: 執行簡單爬蟲示範，抓取指定來源頁面標題或摘要並回傳結果。

理由：API 簡單、清楚，能支援前端表格、搜尋、圖表與爬蟲展示。

替代方案：將所有資料一次塞入 HTML 可更簡單，但不符合 Express Web API 與 SQLite 的作業要求。

### 5. 前端互動設計

首頁直接呈現主要功能，不做行銷式 landing page。畫面區塊包含：

- 標題與摘要統計。
- 新增價格資料表單。
- 年份滑桿與該年份價格卡片。
- 歷年價格折線圖。
- 搜尋框與資料表格。
- 來源與推估資料說明。

理由：這是課堂作品與教學文件，需要一打開就能操作，不需要額外導覽頁。

替代方案：多頁式網站較完整，但會增加路由與維護成本，不符合一次一功能的 SDD 節奏。

### 6. Azure 部署設計

- `server.js` 使用 `process.env.PORT || 3000`。
- 本機 SQLite 路徑使用專案內的 `data/data.db`。
- Azure App Service 偵測到 `process.env.WEBSITE_SITE_NAME` 時，SQLite 路徑切換為 `/home/data/data.db`。
- `package.json` 設定 `start` script 與 Node.js 20 LTS。
- `.gitignore` 排除 `node_modules`、`.env`、本機 SQLite 檔。

理由：符合 PDF 的 Azure 指引，並讓 SQLite 在 Azure 重新部署後可持久保存。

替代方案：使用雲端資料庫更穩定，但會超出本課程指定 SQLite 的重點。

## Risks / Trade-offs

- [Risk] 雞排價格資料有些是推估值，可能被誤解為官方精確統計。 → Mitigation：資料表與畫面都顯示「推估」標籤、來源 URL 與備註。
- [Risk] 同一年可能有多筆不同品牌或地區資料，圖表若只畫單一價格會簡化現實。 → Mitigation：圖表使用代表價格，表格與年份卡片列出同年所有相關紀錄。
- [Risk] 爬蟲來源網站可能改版或阻擋請求。 → Mitigation：爬蟲作為加分示範，失敗時回傳清楚錯誤訊息，不影響主要網站功能。
- [Risk] Azure App Service 免費 F1 資源有限，啟動或部署可能較慢。 → Mitigation：維持 Express 單一服務、避免大型套件，文件中說明 Log stream 檢查方式。
- [Risk] SQLite 在雲端多人同時寫入能力有限。 → Mitigation：本專題為教學與 demo 用途，資料量小，SQLite 足以支撐。

## Migration Plan

1. 初始化專案與 OpenSpec 文件。
2. 建立 Express、SQLite 與前端靜態檔案。
3. 匯入雞排價格初始資料。
4. 實作 API 與前端互動。
5. 本機使用 `npm install`、`npm start` 測試。
6. 建立 GitHub repo 並推送原始碼。
7. 在 Azure App Service 建立 Node.js 20 LTS Web App。
8. 連接 GitHub Deployment Center 自動部署。
9. 截圖 localhost、GitHub、Azure 與操作畫面。
10. 產生 Notion Markdown 教學文件。

若部署失敗，先使用本機版本與 GitHub 原始碼作為基本繳交，並依 Azure Log stream 修正啟動、套件或 SQLite 路徑問題。

## Open Questions

- 使用者是否希望網站標題固定為「雞排物價觀測站」，或從多個候選標題中再選一個？
- 爬蟲功能要抓取哪一個公開來源作為示範頁面？
- GitHub repo 要由使用者手動建立，還是之後授權我使用 GitHub 工具或 `gh` 協助建立？
