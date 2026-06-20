# 雞排物價觀測站：台灣雞排歷年物價變化追蹤網站

## 一、基本資料

| 項目 | 內容 |
|---|---|
| 姓名 | 黃祺齡 |
| 學號 | D1499082 |
| 班級 | 逢甲大學資訊工程學系學士後專班 114-2 |
| 課程名稱 | Web 程式設計 |
| 授課老師 | 劉明機 |
| 網站標題 | 雞排物價觀測站 |
| GitHub Repo | https://github.com/JerrickHuang/taiwan-chicken-cutlet-price-tracker |
| Azure 網站 | https://price-tracker-d1499082-cycwaybya0djcvgy.eastasia-01.azurewebsites.net |

> Notion 截圖建議：這裡可以放一張網站首頁截圖，包含標題「雞排物價觀測站」與雞排圖片。

## 二、專題主題介紹

本專題製作一個「台灣雞排歷年物價變化追蹤網站」，使用 1993 到 2026 年的雞排價格觀測資料，讓使用者可以查詢雞排價格從早期銅板價逐漸走向百元時代的變化。

網站提供的核心功能包含：

- 查看雞排歷年價格表格
- 使用搜尋框查詢年份、品牌、來源或備註
- 使用年份滑桿觀察特定年度附近的價格資料
- 使用折線圖觀察長期價格趨勢
- 新增一筆價格紀錄
- 使用爬蟲功能預覽公開來源網頁標題與狀態
- 部署到 Azure App Service，讓作品可以由公開網址瀏覽

## 三、為什麼選擇雞排作為主題

我選擇雞排作為主題，是因為雞排是台灣非常具代表性的庶民小吃。很多人對雞排價格都有生活記憶，例如以前一片雞排可能 30 元、40 元，近年在熱門商圈或連鎖店則常見 90 元到 120 元。

雞排價格很適合拿來做 Web 程式設計期末專題，原因如下：

1. 雞排是大眾熟悉的商品，使用者容易理解資料意義。
2. 雞排價格有明顯的時間變化，適合用折線圖呈現。
3. 不同年份、店家、地區會有價格差異，適合用表格和搜尋功能整理。
4. 這個主題能結合民生物價、資料查詢、資料視覺化與資料來源說明。
5. 使用者新增資料時，可以立即感受到網站互動效果。

## 四、系統功能規格

| 功能分類 | 功能名稱 | 說明 | 實作狀態 |
|---|---|---|---|
| 網站主題 | 網站標題 | 使用「雞排物價觀測站」作為網站名稱 | 已完成 |
| 資料輸入 | 新增價格紀錄 | 輸入日期、商品名稱、商品價格，送到後端儲存 | 已完成 |
| 查詢功能 | 歷史資料表格 | 以表格呈現所有雞排價格資料 | 已完成 |
| 查詢功能 | 文字搜尋 | 可搜尋年份、商品、來源代號、備註 | 已完成 |
| 查詢功能 | 年份滑桿 | 拖曳年份後顯示該年份附近的價格資料 | 已完成 |
| 圖表功能 | 歷年價格折線圖 | 使用 Canvas 繪製 1993 到 2026 年價格趨勢 | 已完成 |
| 資料摘要 | 價格摘要卡 | 顯示資料筆數、最低價格、最高價格、平均價格 | 已完成 |
| 後端 API | Express.js Web API | 提供價格查詢、新增、摘要與爬蟲 API | 已完成 |
| 資料庫 | SQLite | 使用 SQLite 儲存價格資料 | 已完成 |
| 規格流程 | OpenSpec | 使用 OpenSpec 記錄需求、設計與任務 | 已完成 |
| 加分功能 | 來源爬蟲示範 | 輸入公開來源網址，抓取頁面標題、狀態碼與讀取時間 | 已完成 |
| 加分功能 | Azure 部署 | 部署 Express + SQLite 到 Azure App Service | 已完成 |

## 五、技術架構

本專案使用前後端分離但同一個 Express 專案提供服務的架構。

```text
使用者瀏覽器
  ↓
前端 HTML / CSS / JavaScript
  ↓ fetch API
Express.js Web API
  ↓
SQLite Database
```

使用技術：

| 類別 | 技術 |
|---|---|
| 前端 | HTML、CSS、JavaScript |
| 圖表 | HTML Canvas |
| 後端 | Node.js、Express.js |
| 資料庫 | SQLite |
| 套件 | express、sqlite3 |
| 版本管理 | Git、GitHub |
| 部署 | Azure App Service |
| CI/CD | GitHub Actions |
| 規格文件 | OpenSpec / SDD |

## 六、專案資料夾結構

```text
taiwan-chicken-cutlet-price-tracker/
├── .github/
│   └── workflows/
│       └── main_price-tracker-d1499082.yml
├── data/
│   └── data.db
├── openspec/
│   └── changes/
│       └── initial-price-tracker-spec/
│           ├── proposal.md
│           ├── design.md
│           ├── tasks.md
│           └── specs/
├── public/
│   ├── assets/
│   │   └── chicken-cutlet-hero.png
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── src/
│   ├── database.js
│   └── validation.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

主要檔案說明：

| 檔案 | 功能 |
|---|---|
| `server.js` | Express 主程式，啟動網站與 API |
| `src/database.js` | SQLite 連線、建表、初始資料、查詢、新增 |
| `src/validation.js` | 驗證使用者輸入資料 |
| `public/index.html` | 前端頁面結構 |
| `public/styles.css` | 網站視覺設計與響應式版面 |
| `public/app.js` | 前端互動、API 呼叫、表格、滑桿、圖表 |
| `openspec/changes/initial-price-tracker-spec/` | OpenSpec 規格與任務紀錄 |
| `.github/workflows/main_price-tracker-d1499082.yml` | GitHub Actions 自動部署設定 |

## 七、SQLite 資料庫設計

本專案原始資料來自整理好的雞排價格資料，實作時轉成網站較容易使用的 `price_records` 資料表。

主要欄位如下：

| 欄位 | 型態 | 說明 |
|---|---|---|
| `id` | INTEGER | 主鍵 |
| `record_date` | TEXT | 資料日期 |
| `item_name` | TEXT | 商品名稱 |
| `period` | TEXT | 顯示用期間 |
| `year_start` | INTEGER | 起始年份 |
| `year_end` | INTEGER | 結束年份 |
| `price_ntd` | INTEGER | 代表價格 |
| `price_min_ntd` | INTEGER | 最低價格 |
| `price_max_ntd` | INTEGER | 最高價格 |
| `is_estimated` | INTEGER | 是否為推估資料，0 否、1 是 |
| `source_ref` | TEXT | 來源代號，例如 R1、R2 |
| `source_url` | TEXT | 來源網址 |
| `note` | TEXT | 備註說明 |
| `created_at` | TEXT | 建立時間 |

設計重點：

- `record_date`、`item_name`、`price_ntd` 對應老師要求的輸入欄位。
- `period`、`year_start`、`year_end` 支援 1993-1995 這種期間資料。
- `price_min_ntd`、`price_max_ntd` 支援價格區間。
- `is_estimated` 可清楚區分「來源紀錄」與「推估資料」。
- `source_ref`、`source_url` 保留資料可信度與來源。

## 八、Express API 規格

| Method | API | 功能 |
|---|---|---|
| GET | `/api/health` | 檢查網站環境與資料庫路徑 |
| GET | `/api/prices` | 取得價格資料，可使用 `q`、`year`、`estimated` 查詢 |
| POST | `/api/prices` | 新增一筆價格紀錄 |
| GET | `/api/prices/summary` | 取得資料筆數、最高價、最低價、平均價 |
| GET | `/api/sources` | 取得來源資料 |
| POST | `/api/crawl` | 爬蟲示範，讀取公開來源網頁標題與狀態 |

新增資料 API 範例：

```json
{
  "record_date": "2026-06-20",
  "item_name": "雞排",
  "price_ntd": "120"
}
```

成功回傳範例：

```json
{
  "record": {
    "id": 18,
    "record_date": "2026-06-20",
    "item_name": "雞排",
    "period": "2026-06-20",
    "year_start": 2026,
    "year_end": 2026,
    "price_ntd": 120,
    "price_min_ntd": 120,
    "price_max_ntd": 120,
    "is_estimated": 0,
    "source_ref": "USER",
    "source_url": "",
    "note": ""
  }
}
```

## 九、OpenSpec / SDD 實作流程

本專案依照 OpenSpec / SDD 流程，在寫程式碼之前先定義需求、設計與任務。

OpenSpec 文件位置：

```text
openspec/changes/initial-price-tracker-spec/
```

| 文件 | 說明 |
|---|---|
| `proposal.md` | 說明為什麼要做、要改什麼、影響範圍 |
| `design.md` | 說明系統架構、資料模型、API 設計、部署設計 |
| `tasks.md` | 將專案拆成可檢查的任務清單 |
| `specs/price-record-management/spec.md` | 價格資料新增、儲存與欄位規格 |
| `specs/price-query-and-filtering/spec.md` | 查詢、搜尋、篩選規格 |
| `specs/price-visualization/spec.md` | 摘要卡、滑桿、圖表規格 |
| `specs/crawler-source-capture/spec.md` | 爬蟲功能規格 |
| `specs/deployment-and-documentation/spec.md` | GitHub、Azure、文件交付規格 |

實作順序：

1. 建立專案資料夾與 OpenSpec 文件。
2. 定義網站功能、API、資料庫欄位與部署方式。
3. 建立 Express 專案與 SQLite 資料層。
4. 匯入 1993 到 2026 年雞排價格資料。
5. 製作前端頁面、表單、表格、搜尋、滑桿與圖表。
6. 加入爬蟲示範功能。
7. 本機執行測試。
8. 推送原始碼到 GitHub。
9. 使用 Azure App Service 部署。
10. 產生 Notion 教學文件。

## 十、本機執行流程

### 1. 進入專案資料夾

```bash
cd /Users/jerrickhuang/CodexProject/taiwan-chicken-cutlet-price-tracker
```

### 2. 安裝套件

```bash
npm install
```

### 3. 啟動網站

```bash
npm start
```

成功時終端機會顯示：

```text
雞排物價觀測站 running on http://localhost:3000
SQLite database: /Users/jerrickhuang/CodexProject/taiwan-chicken-cutlet-price-tracker/data/data.db
```

### 4. 開啟網站

瀏覽器輸入：

```text
http://localhost:3000
```

> Notion 截圖建議：放 localhost 首頁截圖。

### 5. 測試新增資料

在「新增價格紀錄」表單輸入：

| 欄位 | 範例 |
|---|---|
| 日期 | 2026-06-20 |
| 商品名稱 | 雞排 |
| 商品價格 | 120 |

送出後畫面會顯示剛新增的資料，並顯示伺服器實際儲存價格。

> Notion 截圖建議：放新增成功後的「剛新增」卡片與表格高亮畫面。

### 6. 測試搜尋

在搜尋欄輸入：

```text
2018
```

或：

```text
熱門商圈
```

表格會縮小成符合條件的資料。

> Notion 截圖建議：放搜尋結果畫面。

### 7. 測試爬蟲

在「來源爬蟲示範」輸入公開來源網址，例如：

```text
https://tw.news.yahoo.com/%E9%9B%9E%E6%8E%92%E4%BB%A5%E5%89%8D%E5%8F%AA%E8%A6%81135
```

成功時會顯示：

- 頁面標題
- HTTP 狀態碼
- 讀取時間
- 開啟來源頁面的連結

> Notion 截圖建議：放爬蟲成功畫面，包含狀態碼 200 與來源標題。

## 十一、GitHub 原始碼繳交

GitHub repo：

```text
https://github.com/JerrickHuang/taiwan-chicken-cutlet-price-tracker
```

本專案已將原始碼推送到 GitHub，並排除以下不應上傳的檔案：

- `node_modules/`
- `.env`
- 本機 SQLite 檔案 `data/*.db`
- log 檔案

> Notion 截圖建議：放 GitHub repo 首頁截圖，能看到 `server.js`、`public/`、`src/`、`openspec/`。

## 十二、Azure App Service 部署流程

### 1. 建立 Azure Web App

Azure App Service 設定：

| 項目 | 選擇 |
|---|---|
| Publish | Code |
| Runtime stack | Node 22 LTS |
| Operating System | Linux |
| Region | East Asia |
| Pricing plan | Free F1 |
| App name | price-tracker-d1499082 |

> 原本教學可能寫 Node 20 LTS，但 Azure 介面若沒有 Node 20 LTS，可選 Node 22 LTS。

### 2. 連接 GitHub

在 Azure Deployment Center 選擇：

| 項目 | 選擇 |
|---|---|
| Source | GitHub |
| Organization | JerrickHuang |
| Repository | taiwan-chicken-cutlet-price-tracker |
| Branch | main |
| Workflow option | Add a workflow |

### 3. 使用 Publish Profile 部署

因為一開始使用 Azure Identity 部署時出現訂閱權限問題，所以改用 Publish Profile 部署。

處理方式：

1. 在 Azure App Service 下載 publish profile。
2. 到 GitHub repo 的 Settings。
3. 進入 Secrets and variables > Actions。
4. 新增 Repository secret：

```text
AZURE_WEBAPP_PUBLISH_PROFILE
```

5. 將 publish profile 內容貼入 secret。
6. 修改 GitHub Actions workflow，使用 publish profile 部署。

### 4. 確認部署成功

GitHub Actions 最新 workflow 已成功完成。

Azure 網站：

```text
https://price-tracker-d1499082-cycwaybya0djcvgy.eastasia-01.azurewebsites.net
```

健康檢查 API：

```text
https://price-tracker-d1499082-cycwaybya0djcvgy.eastasia-01.azurewebsites.net/api/health
```

成功回傳：

```json
{
  "ok": true,
  "app": "雞排物價觀測站",
  "environment": "azure",
  "database": "/home/data/data.db"
}
```

這代表：

- Express 已在 Azure 執行
- Azure 環境辨識成功
- SQLite 使用 `/home/data/data.db`
- 資料可在部署後保留

> Notion 截圖建議：放 Azure App Service Overview、GitHub Actions success、Azure 網站首頁、`/api/health` 回傳畫面。

## 十三、畫面功能說明

### 1. 首頁 Hero 區

首頁使用「雞排物價觀測站」作為主標題，右側放置雞排圖片，讓使用者一進入網站就知道主題是雞排價格。

### 2. 價格摘要

摘要卡片顯示：

- 資料筆數
- 最低價格
- 最高價格
- 平均價格

### 3. 新增價格紀錄

使用者可以輸入日期、商品名稱、商品價格。送出後網站會：

- 呼叫 `POST /api/prices`
- 儲存到 SQLite
- 顯示剛新增紀錄
- 清除搜尋條件
- 自動切到新增資料年份
- 在表格與年份觀察中高亮顯示

### 4. 年份觀察

使用者拖曳年份滑桿，例如 2026，網站會顯示該年份符合的雞排價格資料。

### 5. 歷年價格折線圖

折線圖呈現 1993 到 2026 年雞排代表價格變化。同一年若有多筆資料，圖表會取平均值繪製。

### 6. 歷史資料查詢

表格列出所有資料，包含：

- 期間
- 商品
- 代表價
- 價格區間
- 資料性質
- 來源
- 備註

搜尋框可以查詢：

- 年份，例如 `2018`
- 來源，例如 `R2`
- 商品或地區，例如 `熱門商圈`
- 備註文字

### 7. 來源爬蟲示範

爬蟲功能不是直接修改資料庫，而是示範如何讀取公開來源頁面的基本資訊。這樣可以避免未驗證資料直接覆蓋正式資料。

顯示內容包含：

- 頁面標題
- HTTP 狀態碼
- 讀取時間
- 來源連結

## 十四、PDF 要求檢查表

### A. 網站功能

| 檢查項目 | 完成狀態 |
|---|---|
| 有網站標題 | 已完成 |
| 可輸入日期、商品名稱、商品價格 | 已完成 |
| 可新增資料 | 已完成 |
| 可查詢資料 | 已完成 |
| 可用表格呈現物價變化 | 已完成 |
| 可用搜尋框縮小範圍 | 已完成 |
| 有互動圖表或動態效果 | 已完成 |
| 有年份滑桿互動 | 已完成 |

### B. 技術架構

| 檢查項目 | 完成狀態 |
|---|---|
| 前端網頁 | 已完成 |
| Express.js Web API | 已完成 |
| SQLite 資料庫 | 已完成 |
| API 與前端串接 | 已完成 |
| 資料可新增並保存 | 已完成 |

### C. 原始碼繳交

| 檢查項目 | 完成狀態 |
|---|---|
| 已建立 GitHub repo | 已完成 |
| 原始碼已推上 GitHub | 已完成 |
| 未上傳 `node_modules` | 已完成 |
| 包含 OpenSpec 文件 | 已完成 |
| 包含 README | 已完成 |

### D. 技術說明文件

| 檢查項目 | 完成狀態 |
|---|---|
| 有姓名、班級、網站標題 | 已完成 |
| 有商品特色介紹 | 已完成 |
| 有為什麼選雞排作為主題 | 已完成 |
| 有 spec 規格表 | 已完成 |
| 有實作流程說明 | 已完成 |
| 有 localhost 執行流程 | 已完成 |
| 有截圖位置提醒 | 已完成 |

### E. 加分項目

| 加分項目 | 完成狀態 |
|---|---|
| 爬蟲功能 | 已完成 |
| Azure App Service 部署 | 已完成 |
| GitHub Actions 自動部署 | 已完成 |

## 十五、我需要自己加入 Notion 的截圖

請依照下面順序加入截圖，文件會更完整：

1. 網站首頁：顯示「雞排物價觀測站」與雞排圖片。
2. 價格摘要：顯示資料筆數、最低價、最高價、平均價。
3. 新增資料：輸入日期、商品名稱、價格。
4. 新增成功：顯示「剛新增」卡片與表格高亮。
5. 年份滑桿：顯示 2026 年附近的價格資料。
6. 歷年價格折線圖：顯示 1993 到 2026 價格趨勢。
7. 搜尋功能：輸入 `2018` 或 `熱門商圈` 後的結果。
8. 爬蟲功能：顯示狀態碼 200、來源標題、讀取時間。
9. GitHub repo：顯示專案原始碼。
10. GitHub Actions：顯示最新 workflow 成功。
11. Azure App Service Overview：顯示 Web App 狀態 Running。
12. Azure 網站公開網址：顯示部署後的網站畫面。
13. `/api/health`：顯示 `environment: azure` 與 `/home/data/data.db`。

## 十六、結論

本專題完成一個符合 Web 程式設計期末要求的網站作品：「雞排物價觀測站」。作品使用前端 HTML/CSS/JavaScript、後端 Express.js、SQLite 資料庫，並透過 OpenSpec 先定義需求與規格，再逐步實作功能。

網站不只可以呈現雞排歷年價格資料，也提供搜尋、年份滑桿、折線圖、新增紀錄與爬蟲示範。最後透過 GitHub 與 Azure App Service 部署，讓作品可以在線上公開瀏覽。

這個專題讓我練習到完整 Web 開發流程：需求分析、資料庫設計、API 設計、前端互動、GitHub 版本管理、Azure 雲端部署與技術文件撰寫。
