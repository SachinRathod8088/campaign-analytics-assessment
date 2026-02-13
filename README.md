# 🚀 Campaign Analytics & Investor Insights Dashboard

A modular backend system built with **NestJS + TypeScript** that processes campaign funding data, investor activity, generates analytical reports, and provides chart visualizations — all using file-based JSON storage (no database).

---

## 👨‍💻 Tech Stack

- **NestJS**
- **TypeScript**
- **File-based JSON storage**
- **Jest (Unit Testing)**
- **class-validator (DTO Validation)**

---

## 📂 Project Structure


src/
│
├── campaign-analytics/ # Campaign metrics logic
├── investor-insights/ # Investor metrics logic
├── reports/ # Report generation module
├── charts/ # QuickChart integration
├── seed/ # Sample data generation
└── common/ # Shared services & helpers

assessment/ # Input JSON files
output/ # Generated output files


---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

```bash
npm install
2️⃣ Run the application
npm run start:dev
Application runs at:

http://localhost:3000


🌱 Generate Sample Data (Important)
Before testing APIs, generate output data:

GET http://localhost:3000/seed-data
This generates:

output/campaign-analytics.json (100 records)

output/investor-insights.json (100 records)

output/analytics-reports.json (100 records)

📊 Available API Endpoints

🔹 Campaign Analytics

Method	Endpoint
GET	/campaign-analytics
GET	/campaign-analytics/campaign/:id
GET	/campaign-analytics/campaign/:id/trends?days=30
POST	/campaign-analytics/campaign/:id/calculate


🔹 Investor Insights
Method	Endpoint

GET	/campaign-analytics/investors
GET	/campaign-analytics/investor/:id
GET	/campaign-analytics/investors/top?limit=10
POST	/campaign-analytics/investor/:id/calculate


🔹 Reports
Method	Endpoint

GET	/reports
GET	/reports/:id
POST	/reports/generate

Example body for report generation:

{
  "report_type": "campaign",
  "report_period_start": "2026-01-01",
  "report_period_end": "2026-01-31"
}


🔹 Charts (QuickChart Integration)
Method	Endpoint


POST	/charts/generate
GET	/charts/campaign/:id?days=30


🔹 Seed Data
Method	Endpoint

GET	/seed-data
POST	/seed-data

🧮 Business Logic & Formulas

📈 Campaign Performance Score
(funding_progress × 0.6) + (investor_component × 0.4)
Funding Progress = (Raised / Commitment) × 100

Investor Component = (Investors / 50) × 100

Final score capped at 100

📊 Investor Engagement Score
MIN(totalInvestments/10, 1) × 50 +
MIN(totalAmount/1000000, 1) × 50
Score capped at 100

👥 Investor Segment Classification


Condition	Segment
≥ 50,00,000	Whale
≥ 5 investments	Regular
≥ 2 investments	Occasional


Otherwise	New
🧪 Running Tests
npm run test

To check coverage:

npm run test:cov


🛡️ Data Handling Rules

Only transactions with status = "invested" are considered.

Division-by-zero cases are safely handled.

All calculated scores are capped at 100.

Output folder is automatically created if missing.

DTO validation is enabled globally.


🏗️ Architecture Approach


Implemented clean modular architecture using NestJS best practices.

Reused business logic across modules to avoid duplication.

Created a centralized FileReaderService for file operations.

Implemented formulas inside a reusable FormulaHelper.

SeedService orchestrates generation of 100 records for each output file.

Used dependency injection for maintainability and scalability.

Added comprehensive unit tests to ensure reliability.

📌 Notes
This project intentionally avoids using a database and operates entirely on JSON files to demonstrate business logic implementation, modular design, and data processing capabilities in NestJS.

👨‍💼 Author
Sachin Rathod
Backend Developer | MCA 2024
