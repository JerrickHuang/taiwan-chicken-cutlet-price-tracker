# 雞排物價觀測站

本專案是逢甲大學「Web 程式設計」期末專題，主題為台灣雞排歷年物價變化追蹤與查詢。

## 專案資訊

- 姓名：黃祺齡
- 學號：D1499082
- 班級：逢甲大學資訊工程學系學士後專班 114-2
- 課程名稱：Web 程式設計
- 授課老師：劉明機
- GitHub repo：`taiwan-chicken-cutlet-price-tracker`

## 專案目標

網站會提供雞排價格資料新增、查詢、表格呈現、互動圖表、年份滑桿、爬蟲示範，以及 Azure App Service 部署。

## 技術架構

- 前端：HTML、CSS、JavaScript
- 後端：Express.js Web API
- 資料庫：SQLite
- 規格流程：OpenSpec / SDD
- 部署：Azure App Service

## 本機執行

安裝套件：

```bash
npm install
```

啟動網站：

```bash
npm start
```

預設網址：

```text
http://localhost:3000
```

## OpenSpec 文件

目前規格文件位於：

```text
openspec/changes/initial-price-tracker-spec/
```

包含 `proposal.md`、`design.md`、`tasks.md` 與各 capability spec。
