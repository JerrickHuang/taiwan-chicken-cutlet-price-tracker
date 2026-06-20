## ADDED Requirements

### Requirement: Show price trend visualization
The system SHALL provide a visual chart showing chicken cutlet representative prices across years or periods.

#### Scenario: Chart loads with seed data
- **WHEN** the website receives price records from the API
- **THEN** the frontend MUST render a price trend chart that makes long-term price growth visible

#### Scenario: Chart updates after new record
- **WHEN** the user adds a new price record successfully
- **THEN** the chart MUST refresh to include the new record without requiring manual server restart

### Requirement: Provide year slider interaction
The system SHALL provide a year slider for exploring price records by year.

#### Scenario: Slider selects a year
- **WHEN** the user moves the slider to a year between 1993 and 2026
- **THEN** the frontend MUST show price records related to that selected year

#### Scenario: Slider shows no matching data
- **WHEN** the selected year has no matching record
- **THEN** the frontend MUST show a friendly empty state in Taiwan Traditional Chinese

### Requirement: Show summary statistics
The system SHALL show summary information including record count, minimum price, maximum price, and visible year range.

#### Scenario: Summary loads
- **WHEN** the frontend receives summary data from the API
- **THEN** the website MUST display concise summary statistics near the top of the page
