# Premium Next.js 14 Developer & Designer Portfolio

A minimal, content-first developer and designer portfolio built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **GitHub** for serverless, database-free asset storage.

## Features
- **Featured & Work Grid Pages**: Client-side filtering by categories (`logo`, `flyer`, `instagram`, `website`, `video`) with responsive designs.
- **Dynamic Media View**: Interactive lightbox modal zoom for graphics, browser frame mockups for sites, and custom embedded players for videos.
- **GitHub Local Asset Data**: Crawls your GitHub repository paths to dynamically fetch asset media files and build a local database file (`src/data/projects.json`), referencing files directly via the GitHub CDN.
- **Minimal Aesthetics**: Styled with a warm coral accent color, clean whitespace, and typography configurations.

---

## Getting Started

### 1. Environment Configurations

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the keys:
   - `GITHUB_REPO`: The repository containing your assets (e.g. `oussama-aamri/Portfolio`).
   - `GITHUB_PATHS`: Comma-separated paths to folders inside your repo to import from (e.g. `assets/logos,assets/flyers,assets/instagram`).
   - `GITHUB_BRANCH`: The branch to resolve raw media files from (defaults to `main`).
   - `GITHUB_TOKEN`: A GitHub personal access token (optional, but highly recommended to bypass API rate-limiting).
   - *Note: Supabase credentials are no longer required to serve portfolio assets.*

### 2. Run the GitHub Import Script

To crawl your GitHub repository paths and compile your local database file (`src/data/projects.json`), run:

```bash
npx tsx scripts/import-from-github.ts
```

This creates/updates `src/data/projects.json` with the projects and their corresponding raw GitHub CDN URLs. You can then edit `src/data/projects.json` directly to customize titles, descriptions, tools, featured status, and ordering without having them overwritten on subsequent imports.

### 3. Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

You can deploy the repository directly using the Vercel CLI or through the dashboard interface:

### Option A: Vercel Dashboard
1. Push your repository to GitHub.
2. Link the repository in your Vercel Dashboard.
3. Add your environment variables (from `.env.local`) under **Settings > Environment Variables**.
4. Deploy!

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```
