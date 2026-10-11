<h1 align="center">Movie WatchList</h1>

<p align="center"><a href="https://moviewatchlist-c6kp.onrender.com"><b>moviewatchlist-c6kp.onrender.com</b></a><br/><sub>Free Render instance: the first load can take a minute while it wakes up.</sub></p>

<p align="center">
  <a href="https://moviewatchlist-c6kp.onrender.com"><img alt="Live app" src="https://img.shields.io/badge/live-Render-46E3B7?style=flat-square&logo=render&logoColor=white"></a>
  <img alt="Practice project" src="https://img.shields.io/badge/full--stack-practice-8E8E93?style=flat-square">
</p>
<p align="center">
  <a href="https://www.omdbapi.com"><img alt="OMDb API" src="https://img.shields.io/badge/data-OMDb%20API-F5C518?style=flat-square"></a>
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white">
  <img alt="Vite 7" src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white">
  <img alt="Express 5" src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express">
  <img alt="Axios" src="https://img.shields.io/badge/Axios-1-5A29E4?style=flat-square&logo=axios&logoColor=white">
</p>

A small full-stack practice app: search movies on OMDb, add them to a list, rate them, and mark the ones you still want to watch. The Express backend serves the built React frontend from `backend/dist`.

## Features

- Search OMDb by title and open a movie's details in a modal.
- Add a movie with a rating, and flag it for your watchlist.
- Edit or remove movies on your list.
- **Note:** the list is kept in the server's memory, so it resets whenever the server restarts.

## How it fits together

```mermaid
flowchart LR
  B[Browser] --> FE[React frontend]
  FE --> OM[OMDb API<br/>search + details]
  FE --> API[Express<br/>/api/movies]
  API --> MEM[(In-memory list)]
  classDef ext fill:#F5C518,color:#000,stroke:#F5C518
  classDef code fill:#1f2937,color:#fff,stroke:#1f2937
  class OM ext
  class FE,API code
```

Routes: `GET /api/movies`, `GET /api/movies/:id`, `POST /api/movies`, `PUT /api/movies/:id`, `DELETE /api/movies/:id`.

## Adding a movie

```mermaid
flowchart TD
  P[POST /api/movies] --> F{Title, id, rating, watchlist,<br/>Type, Year and Poster all sent?}
  F -- no --> E1[400 A field is<br/>invalid/missing]
  F -- yes --> U{id already<br/>on the list?}
  U -- yes --> E2[400 must be unique]
  U -- no --> OK[Added]
  classDef good fill:#15803d,color:#fff,stroke:#15803d
  classDef bad fill:#b91c1c,color:#fff,stroke:#b91c1c
  class OK good
  class E1,E2 bad
```

`PUT /api/movies/:id` checks the same fields and returns 400 if the id isn't on the list yet.

## Using it

```mermaid
sequenceDiagram
  actor U as You
  participant FE as Frontend
  participant O as OMDb
  participant API as Express
  U->>FE: Type a movie title
  FE->>O: Search
  O-->>FE: Results
  U->>FE: Pick one, set a rating
  FE->>API: POST /api/movies
  API-->>FE: Saved movie
  FE-->>U: Shows on your list
```

## Run locally

```bash
cd frontend
cp .env.example .env      # set VITE_OMBd_API_key to your OMDb key
npm install
npm run dev               # frontend on Vite's dev server

cd ../backend
npm install
npm run dev               # API on port 3001 (Vite proxies /api to it)
```

`npm run build:ui` in `backend/` builds the frontend into `backend/dist`, which Express serves in production.
