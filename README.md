# FindMyTeam — Full-Stack (Frontend + Backend)

FindMyTeam is a full-stack web application concept focused on helping people find sports teammates/partners and organize activities.  
This repository is structured as a **monorepo** with separate **backend** and **frontend** directories. :contentReference[oaicite:0]{index=0}

---

## Repository Structure

- `backend/` — Backend API (C#) :contentReference[oaicite:1]{index=1}  
- `frontend/` — Frontend web client (HTML/CSS/JavaScript) :contentReference[oaicite:2]{index=2}  

---

## Tech Stack

Based on repository language breakdown:
- **Backend:** C# :contentReference[oaicite:3]{index=3}  
- **Frontend:** JavaScript + CSS + HTML :contentReference[oaicite:4]{index=4}  

> Note: Exact frameworks/libraries (ASP.NET Core version, DB provider, frontend tooling) depend on the implementation inside the folders.

---

## What This Project Does (High-Level)

Typical flows for this type of app:
- Create/browse sports activities (time/location/sport type)
- Discover teammates/participants
- Basic user/team data management through an API
- Frontend communicates with backend via HTTP (REST)

---

## Getting Started (Local Development)

### 1) Clone the repository
```bash
git clone https://github.com/ilknurhnc/FindMyTeam.git
cd FindMyTeam

Backend Setup (backend/)
Prerequisites

.NET SDK (recommended: .NET 7 or .NET 8)

Run backend
cd backend
dotnet restore
dotnet run


If the backend has Swagger enabled, you can typically view API docs at:

http://localhost:<PORT>/swagger

Database (if used)

If your backend uses a database (common in such projects), configure the connection string in one of these:

backend/appsettings.json

backend/appsettings.Development.json

Environment variables

Common EF Core migration flow (only if EF Core is used in your project):

cd backend
dotnet ef database update


If you don’t have migrations set up, you can skip this section.

Frontend Setup (frontend/)
Option A — Static frontend (no build tools)

If your frontend is plain HTML/CSS/JS, you can serve it like this:

cd frontend
python3 -m http.server 5173


Then open:

http://localhost:5173

Option B — Frontend with npm scripts (if applicable)

If your frontend contains a package.json:

cd frontend
npm install
npm run dev

Connecting Frontend ↔ Backend

You typically need to ensure:

API base URL in the frontend points to the backend URL (e.g., http://localhost:5000).

CORS is enabled on the backend to allow requests from the frontend origin (e.g., http://localhost:5173).

Suggested approach:

Put API URL in a single place (e.g., frontend/config.js) and reference it everywhere:

const API_BASE_URL = "http://localhost:5000";

Recommended Documentation Additions (Optional but Strongly Recommended)

To make this repo “internship-ready”, consider adding:

Screenshots / short demo GIF

API endpoint list (even a small table helps)

Example .env file (never commit secrets)

One-click run (Docker Compose) if you want: docker-compose up

Roadmap (Ideas)

Authentication (JWT)

Role-based access (admin/user)

Better search/matching (filters: sport type, location, skill level)

Deployment (Docker) + CI pipeline (GitHub Actions)

Author

Ilknur Hançer
GitHub: https://github.com/ilknurhnc

::contentReference[oaicite:5]{index=5}
