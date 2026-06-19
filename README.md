# Premium Next.js 14 + Supabase Designer Portfolio

A minimal, content-first developer and designer portfolio built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase** for database and storage.

## Features
- **Featured & Work Grid Pages**: Client-side filtering by categories (`logo`, `flyer`, `instagram`, `website`, `video`) with responsive designs.
- **Dynamic Media View**: Interactive lightbox modal zoom for graphics, browser frame mockups for sites, and custom embedded players for videos.
- **GitHub Asset Import**: Automates pulling media and generating projects from a GitHub repo using REST APIs and Supabase Storage uploads.
- **Minimal Aesthetics**: Styled with a warm coral accent color, clean whitespace, and typography configurations.

---

## Getting Started

### 1. Supabase Project Setup

1. Create a new project in [Supabase Console](https://database.supabase.com).
2. Go to the **SQL Editor** and run the query script inside [supabase/migrations/20260619_init.sql](file:///Users/osama/Portfolio/supabase/migrations/20260619_init.sql) to initialize the tables (`projects`, `project_media`) and their access policies.
3. Go to the **Storage** dashboard and create a new bucket named **`portfolio-media`**.
   - Make sure to check **Public bucket** (so assets are publicly readable).

### 2. Environment Configurations

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the keys:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project API URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase admin service role key (required for uploading files during the import script).
   - `GITHUB_TOKEN`: A GitHub personal access token (optional, but prevents rate-limiting).
   - Configure `GITHUB_REPO` and `GITHUB_PATHS` to point to your asset repositories.

### 3. Run the GitHub Import Script

To crawl your GitHub repository paths, upload files to Supabase Storage, and insert linked items into the database, run:

```bash
npx tsx scripts/import-from-github.ts
```

### 4. Running Locally

1. Install dependencies (if not already done):
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
