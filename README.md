# Movies Router HW

React + Vite + React Router DOM demo for TMDB.

## Setup

1. Copy `.env.example` to `.env` and set `VITE_TMDB_TOKEN` to your **API Read Access Token** from TMDB.
2. Install deps and run:

```bash
npm i
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

- Import the repo in Vercel.
- Add an **Environment Variable** named `VITE_TMDB_TOKEN` with your token.
- Use the default Vite build command: `npm run build` and output dir `dist`.
