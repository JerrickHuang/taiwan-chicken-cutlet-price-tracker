## ADDED Requirements

### Requirement: Display historical price records
The system SHALL display chicken cutlet price history as a table or list in Taiwan Traditional Chinese.

#### Scenario: User opens the website
- **WHEN** the frontend loads successfully
- **THEN** the system MUST request price records from the Express API and show them in a readable table

#### Scenario: Records remain after refresh
- **WHEN** the user adds a record and refreshes the page
- **THEN** the record MUST still appear because it was stored in SQLite

### Requirement: Search records by text
The system SHALL allow users to narrow visible records with a text search box.

#### Scenario: Search by item or period
- **WHEN** the user enters text matching item name, period, source reference, or note
- **THEN** the system MUST show only matching records

#### Scenario: Empty search restores all records
- **WHEN** the user clears the search box
- **THEN** the system MUST show all available records again

### Requirement: Filter records by year
The system SHALL allow users to filter records by a selected year, including records whose period contains that year.

#### Scenario: Year inside range matches
- **WHEN** the selected year is between a record's `year_start` and `year_end`
- **THEN** the system MUST include that record in the filtered result

#### Scenario: Single-year record matches
- **WHEN** the selected year equals both `year_start` and `year_end`
- **THEN** the system MUST include that single-year record in the filtered result
