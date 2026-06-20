## ADDED Requirements

### Requirement: Prepare GitHub-ready source code
The project SHALL be ready for GitHub submission with a clear structure and without generated dependency folders.

#### Scenario: Repository is inspected
- **WHEN** the GitHub repository is opened by the instructor
- **THEN** it MUST include source code, OpenSpec files, package files, README, and `.gitignore`, and MUST NOT include `node_modules`

### Requirement: Support local execution
The project SHALL support local execution through npm commands.

#### Scenario: Local startup
- **WHEN** a user runs `npm install` and `npm start`
- **THEN** the Express server MUST start and serve the website locally

### Requirement: Support Azure App Service deployment
The project SHALL support deployment to Azure App Service using Node.js and SQLite.

#### Scenario: Azure assigns a dynamic port
- **WHEN** the app runs on Azure App Service
- **THEN** the Express server MUST listen on `process.env.PORT`

#### Scenario: Azure persists SQLite data
- **WHEN** the app runs on Azure App Service
- **THEN** SQLite data MUST be stored under `/home/data` so records remain after restart or redeployment

### Requirement: Produce Notion-ready teaching document
The project SHALL include a Markdown report that can be imported into Notion as a teaching document.

#### Scenario: Report is reviewed
- **WHEN** the report is opened
- **THEN** it MUST include student information, website title, product introduction, selection reason, OpenSpec table, implementation steps, localhost screenshots placeholders, Azure deployment steps, and final checklist
