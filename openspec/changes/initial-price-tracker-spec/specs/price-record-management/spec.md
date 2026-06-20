## ADDED Requirements

### Requirement: Store chicken cutlet price records
The system SHALL store chicken cutlet price records in SQLite with fields for date, item name, representative price, optional price range, period, source, estimated flag, and note.

#### Scenario: Initial data is available
- **WHEN** the application starts with an empty SQLite database
- **THEN** the system MUST create the price table and insert the 1993 to 2026 chicken cutlet price seed records

#### Scenario: User adds a required record
- **WHEN** the user submits record date, item name, and price
- **THEN** the system MUST save the record to SQLite and return the created record through the API

#### Scenario: Missing required fields are rejected
- **WHEN** the user submits a record without date, item name, or price
- **THEN** the system MUST reject the request with a clear validation error

### Requirement: Preserve source credibility
The system SHALL preserve source URL, source reference, estimated flag, and note for each seeded or crawler-created price record.

#### Scenario: Estimated record is displayed
- **WHEN** a price record has `is_estimated` set to 1
- **THEN** the system MUST expose that value through the API so the frontend can mark it as estimated

#### Scenario: Source URL exists
- **WHEN** a price record has a source URL
- **THEN** the system MUST expose the source URL so the frontend can link to the original reference
