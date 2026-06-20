## ADDED Requirements

### Requirement: Provide crawler demonstration endpoint
The system SHALL provide a crawler demonstration endpoint that fetches a public source URL and returns basic source information.

#### Scenario: Crawl succeeds
- **WHEN** the user triggers the crawler with a supported public URL
- **THEN** the system MUST fetch the page and return at least the URL, HTTP status, page title when available, and fetch time

#### Scenario: Crawl fails safely
- **WHEN** the crawler cannot fetch or parse the target URL
- **THEN** the system MUST return a clear error message without crashing the Express server

### Requirement: Keep crawler separate from core records
The system SHALL keep crawler results separate from manually verified price seed records unless the user explicitly saves a result.

#### Scenario: Crawler preview only
- **WHEN** the crawler returns source information
- **THEN** the system MUST display it as a preview and MUST NOT automatically overwrite existing price records
