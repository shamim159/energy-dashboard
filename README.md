# Energy Dashboard Demo – Next.js + TypeScript

A modern energy contracts dashboard demonstrating filtering, search, API development and data visualisation using **Next.js, React, TypeScript and Recharts**.

---

## Overview

This application simulates an energy supplier portfolio tool that allows users to:

* View a table of energy contracts
* Filter by commodity, status and kWh range
* Search across customers, sites and contract IDs
* Visualise annual consumption by commodity
* Query a typed API endpoint
* Test the API via Postman

---

## Tech Stack & Tools

### Core Development

* **Next.js (App Router)** – framework & API routes
* **React 18** – UI components
* **TypeScript** – strong typing
* **Recharts** – data visualisation

### Tooling

* **Node.js / npm** – runtime & packages
* **Visual Studio Code** – development environment
* **Git & GitHub** – version control
* **Postman** – API testing
* **Vercel** – deployment platform

### Concepts Demonstrated

* API design & JSON handling
* React state management
* Dashboard UX principles
* Data filtering & aggregation
* Component composition
* Spec-driven / AI-assisted development workflow

---

## Project Structure

```
app/
  page.tsx                 – Main dashboard UI
  api/contracts/route.ts   – API endpoint

components/
  ContractsTable.tsx       – Data table
  ContractsChart.tsx       – Recharts visualisation

lib/
  contracts.types.ts       – TypeScript models
  contracts.mock.ts        – Mock dataset
  contracts.query.ts       – Filtering logic
```

---

## Running Locally

### 1) Prerequisites

* Node.js 18+
* npm
* Git

### 2) Install

```bash
git clone <your-repo-url>
cd energy-dashboard-demo
npm install
```

### 3) Start dev server

```bash
npm run dev
```

Open:

👉 [http://localhost:3000](http://localhost:3000)

API available at:

👉 [http://localhost:3000/api/contracts](http://localhost:3000/api/contracts)

---

## API Usage

### Get all contracts

```
GET /api/contracts
```

### Search

```
GET /api/contracts?q=london
```

### Filter

```
GET /api/contracts?commodity=electricity&status=active
```

### Range

```
GET /api/contracts?minKwh=100000&maxKwh=500000
```

---

## Testing with Postman

1. Import the file:

```
EnergyDashboard.postman_collection.json
```

2. Set environment variable:

```
baseUrl = http://localhost:3000
```

3. Run requests:

* Get contracts
* Search
* Filter by commodity
* Filter by status + range

---

## Deployment

### Option A – Vercel (Recommended)

1. Push code to GitHub

```bash
git add .
git commit -m "Initial commit"
git push
```

2. On Vercel:

* New Project
* Import GitHub repo
* Framework = Next.js
* Deploy

Your app will be live at:

```
https://<project>.vercel.app
```

### Option B – Manual Build

```bash
npm run build
npm start
```

---

## Skills Demonstrated

* React & Next.js development
* TypeScript domain modelling
* API creation & JSON handling
* Dashboard UX design
* Data visualisation
* Git workflow
* API testing with Postman
* Cloud deployment

---

## Possible Extensions

* Prisma + database storage
* Auth layer
* CSV export
* Create/Edit contracts
* Real energy cost calculations
* Multi-tenant accounts

---

## License

MIT
