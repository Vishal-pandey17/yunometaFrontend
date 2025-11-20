# Basic Task Manager (MERN)

## Overview
A simple Task Manager that lets you create, read, update and delete tasks. Tasks include a title, description and status, with optional filtering and pagination.

## Tech Stack
- Frontend: React 19 (Vite)
- Backend: Node.js + Express 5, Mongoose 8
- Database: MongoDB
- Other: Axios, CORS, Nodemon, dotenv

## Run Backend
1. cd backend
2. cp .env.example .env   # add MONGO_URI, PORT
3. npm install
4. npm start          # or nodemon index.js

Server listens on `https://yunometa-backend.vercel.app/` and exposes:
GET/POST/PUT/DELETE `/api/tasks`

## Run Frontend
1. cd frontend
2. npm install
3. npm run dev
4. Open Vite dev server URL (usually `https://yunometa-frontend-theta.vercel.app/`)

Update `src/services/api.js` if your backend runs on a different port.