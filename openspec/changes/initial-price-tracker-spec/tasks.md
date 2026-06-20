## 1. Project Setup

- [x] 1.1 Create the Node.js project structure under `taiwan-chicken-cutlet-price-tracker`
- [x] 1.2 Add `package.json` with `start` script, Node.js engine, and required dependencies
- [x] 1.3 Add `.gitignore` excluding `node_modules`, `.env`, and local SQLite database files
- [x] 1.4 Add README with project title, local startup commands, and project purpose

## 2. SQLite Data Layer

- [x] 2.1 Create database helper that selects local `data/data.db` or Azure `/home/data/data.db`
- [x] 2.2 Create `price_records` table with required fields for date, item name, price, period, range, source, estimated flag, and note
- [x] 2.3 Add seed data for 1993 to 2026 chicken cutlet prices
- [x] 2.4 Ensure seed data is inserted only when the table is empty
- [x] 2.5 Add validation for required fields: `record_date`, `item_name`, and `price_ntd`

## 3. Express API

- [x] 3.1 Create Express server and serve static files from `public`
- [x] 3.2 Implement `GET /api/prices` with optional `q`, `year`, and `estimated` filters
- [x] 3.3 Implement `POST /api/prices` for adding user-submitted records
- [x] 3.4 Implement `GET /api/prices/summary` for count, min price, max price, average price, and year range
- [x] 3.5 Implement `GET /api/sources` for source references and URLs
- [x] 3.6 Ensure API errors return clear JSON messages without crashing the server

## 4. Frontend Interface

- [x] 4.1 Create `public/index.html` with Taiwan Traditional Chinese content and accessible structure
- [x] 4.2 Create modern, friendly, responsive styling in `public/styles.css`
- [x] 4.3 Create `public/app.js` to fetch records and summary data from the API
- [x] 4.4 Add form for date, item name, and price input
- [x] 4.5 Add searchable historical price table
- [x] 4.6 Add year slider that displays records matching the selected year
- [x] 4.7 Add price trend chart and refresh it after new records are added
- [x] 4.8 Add visible labels for estimated data and source links

## 5. Crawler Demonstration

- [x] 5.1 Implement `POST /api/crawl` or equivalent crawler endpoint
- [x] 5.2 Fetch a public source URL and extract basic page title or source metadata
- [x] 5.3 Show crawler result preview in the frontend without overwriting verified seed data
- [x] 5.4 Handle crawler failures with user-friendly Traditional Chinese messages

## 6. Local Verification

- [x] 6.1 Run `npm install` successfully
- [x] 6.2 Run `npm start` successfully on localhost
- [x] 6.3 Verify seed records appear in the table
- [x] 6.4 Verify adding a record persists after page refresh
- [x] 6.5 Verify search, year filter, chart, summary, and crawler preview work

## 7. GitHub Submission

- [x] 7.1 Initialize git repository if needed
- [x] 7.2 Commit the working project with OpenSpec files
- [x] 7.3 Create GitHub repository named `taiwan-chicken-cutlet-price-tracker`
- [x] 7.4 Push source code to GitHub and confirm `node_modules` is not included

## 8. Azure Deployment

- [x] 8.1 Confirm server listens on `process.env.PORT || 3000`
- [x] 8.2 Confirm SQLite uses `/home/data` when `WEBSITE_SITE_NAME` exists
- [x] 8.3 Create Azure App Service using Node.js 20 LTS and Free F1 plan
- [x] 8.4 Connect Azure Deployment Center to GitHub main branch
- [x] 8.5 Verify Azure URL opens the deployed website
- [x] 8.6 Verify added data remains after refresh or restart when deployed

## 9. Notion Report

- [ ] 9.1 Create Markdown report with name, student ID, class, course, instructor, and website title
- [ ] 9.2 Add product introduction and personal reason for choosing chicken cutlet
- [ ] 9.3 Add OpenSpec specification table and implementation process
- [ ] 9.4 Add localhost execution steps with screenshot placeholders
- [ ] 9.5 Add GitHub and Azure deployment steps with screenshot placeholders
- [ ] 9.6 Add final checklist matching the PDF requirements A through E
