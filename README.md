# E-commerce (Frontend + Backend)

This project has:
- A **frontend** app in `frontend` (React Router + Vite).
- A **backend** API in `backend` (FastAPI + Uvicorn).

## Project Structure

- `frontend` - client application
- `backend` - Python API server
- `package.json` (root) - helper scripts to run frontend/backend

## Prerequisites

- Node.js and npm installed
- Python 3 installed

## First-Time Setup

### 1) Install root dependencies

From project root:

```bash
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 3) Prepare backend virtual environment

If `backend/venv` already exists, you can skip this section.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
cd ..
```

## Run the App

From project root, run services separately:

```bash
npm run dev:frontend
```

```bash
npm run dev:backend
```

Or run both together:

```bash
npm run dev
```

## Default URLs

- Frontend (dev): `http://localhost:5173` (default Vite port)
- Backend API: `http://127.0.0.1:8000`
- Backend docs (Swagger): `http://127.0.0.1:8000/docs`

## Quick API Check

When backend is running:

```bash
curl http://127.0.0.1:8000/
```

Expected response:

```json
{"message":"Backend Running"}
```
