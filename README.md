# Tabayun — Frontend

A React 19 + TypeScript + Vite single-page app for the AI Image/Video Detector.
This guide walks you through running the app on your machine from scratch.

## Running the app locally — step by step

### 1. Install Node.js

You need **Node.js 20.19+ or 22.12+** (Vite 8 requires it) and **npm** (bundled with Node).

- Download the LTS installer from <https://nodejs.org> and run it.
- Verify the install in a terminal:

  ```bash
  node -v
  npm -v
  ```

### 2. Get the code

Clone the repository (or open the folder if you already have it) and move into it:

```bash
git clone <repository-url>
cd Tabayun
```

### 3. Install dependencies

From the project root, install everything listed in `package.json`:

```bash
npm install
```

This creates the `node_modules/` folder. Run it again any time dependencies change.

### 4. Configure the environment

The frontend talks to the backend through one environment variable. Copy the
example file and fill in your backend URL:

```bash
# macOS / Linux / Git Bash
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Open `.env` and set `VITE_API_URL` to the address where **your backend** is
running, for example:

```env
VITE_API_URL=http://localhost:8000
```

This base URL is where the app expects these endpoints to live:
`POST /auth/login`, `POST /detect/image`, `POST /detect/video`,
`POST /feedback` (admin only), and `GET /health`.

> Note: Vite only reads env variables prefixed with `VITE_`. After changing
> `.env`, restart the dev server (step 5).

### 5. Start the local dev server

```bash
npm run dev
```

Vite prints a local URL (by default **http://localhost:5173**). Open it in your
browser. The server has hot-reload — saved changes appear instantly.

To stop the server, press `Ctrl + C` in the terminal.

## Other useful commands

| Command           | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite dev server (local development) |
| `npm run build`   | Type-check then build for production          |
| `npm run preview` | Serve the production build locally to test it |
| `npm run lint`    | Run ESLint                                    |
| `npm run format`  | Format the code with Prettier                 |

## Troubleshooting

- **Requests fail / login does nothing:** make sure the backend is running and
  `VITE_API_URL` in `.env` points to it, then restart `npm run dev`.
- **CORS errors in the browser console:** the backend must allow requests from
  the dev origin (e.g. `http://localhost:5173`).
- **Port 5173 already in use:** run `npm run dev -- --port 3000` to pick another
  port.
- **`node`/`npm` not recognized:** Node.js isn't installed or your terminal
  needs to be reopened after installing it.
