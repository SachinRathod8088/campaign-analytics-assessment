Campaign Analytics & Investor Insights Dashboard
👨‍💻 Tech Stack

NestJS

TypeScript

File-based JSON storage (No database)

Jest (Testing)

📁 Project Structure
src/
  campaign-analytics/
  investor-insights/
  reports/
  charts/
  seed/
  common/
assessment/ (input JSON files)
output/ (generated files)

🚀 Setup Instructions
1️⃣ Install dependencies
npm install

2️⃣ Start server
npm run start:dev


Server runs on:

http://localhost:3000

🌱 Generate Sample Data (Important)

Before testing APIs, generate data:

GET http://localhost:3000/seed-data


This creates:

output/campaign-analytics.json (100 records)

output/investor-insights.json (100 records)

output/analytics-reports.json (100 records)

📊 Available APIs
Campaign APIs

GET /campaign-analytics

GET /campaign-analytics/campaign/:id

GET /campaign-analytics/campaign/:id/trends?days=30

POST /campaign-analytics/campaign/:id/calculate

Investor APIs

GET /campaign-analytics/investors

GET /campaign-analytics/investor/:id

GET /campaign-analytics/investors/top?limit=10

POST /campaign-analytics/investor/:id/calculate

Reports APIs

GET /reports

GET /reports/:id

POST /reports/generate

Charts APIs

POST /charts/generate

GET /charts/campaign/:id?days=30

Seed API

GET /seed-data

POST /seed-data

🧮 Formula Implementation
Campaign Performance
(funding_progress × 0.6) + (investor_component × 0.4)


Capped at 100.

Investor Engagement
MIN(totalInvestments/10,1)*50 +
MIN(totalAmount/1000000,1)*50


Capped at 100.

Investor Segment

≥ 50L → whale

≥ 5 investments → regular

≥ 2 investments → occasional

else → new

🧪 Run Tests
npm run test

📌 Notes

Only transactions with status = "invested" are used.

Division-by-zero handled safely.

Scores capped at 100.

Output folder auto-created.

DTO validation enabled globally.

Approach Summary

Implemented modular architecture using NestJS best practices.

Created separate services for Campaign Analytics, Investor Insights, Reports, Charts, and Data Seeding.

Reused business logic in CampaignAnalyticsService and InvestorInsightsService inside SeedService to avoid duplication.

Implemented formulas inside a reusable FormulaHelper.

Used FileReaderService as a centralized file handler for reading/writing JSON files.

Implemented DTO validation using class-validator.

Added comprehensive unit tests with Jest.

Ensured clean architecture and separation of concerns.