import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

// Load env variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const githubToken = process.env.GITHUB_TOKEN || '';
const githubRepo = process.env.GITHUB_REPO || '';
const githubPaths = (process.env.GITHUB_PATHS || 'assets/logos,assets/flyers,assets/instagram').split(',');
const githubBranch = process.env.GITHUB_BRANCH || 'main';

if (!githubRepo) {
  console.error('ERROR: GITHUB_REPO must be set in your environment (e.g. owner/repo).');
  process.exit(1);
}

const jsonPath = path.resolve(process.cwd(), 'src/data/projects.json');

// Interface declarations
interface ProjectMedia {
  id: string;
  project_id: string;
  media_type: 'image' | 'video';
  storage_path: string;
  position: number;
}

interface ProjectWithMedia {
  id: string;
  title: string;
  slug: string;
  category: 'logo' | 'flyer' | 'instagram' | 'website' | 'video';
  description: string;
  tools: string[];
  live_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  project_media: ProjectMedia[];
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: 'file' | 'dir';
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function cleanTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferCategory(filePath: string, fileName: string): 'logo' | 'flyer' | 'instagram' | 'website' | 'video' {
  const fullPath = (filePath + '/' + fileName).toLowerCase();
  if (fullPath.includes('logo')) return 'logo';
  if (fullPath.includes('flyer')) return 'flyer';
  if (fullPath.includes('instagram') || fullPath.includes('insta')) return 'instagram';
  if (fullPath.includes('website') || fullPath.includes('web')) return 'website';
  if (fullPath.includes('video') || fullPath.endsWith('.mp4') || fullPath.endsWith('.mov') || fullPath.endsWith('.webm')) return 'video';
  return 'logo'; // Default fallback
}

function getMediaType(fileName: string): 'image' | 'video' {
  const ext = path.extname(fileName).toLowerCase();
  if (['.mp4', '.mov', '.webm', '.ogg'].includes(ext)) {
    return 'video';
  }
  return 'image';
}

async function fetchGitHubDirectory(repo: string, dirPath: string): Promise<GitHubFile[]> {
  const url = `https://api.github.com/repos/${repo}/contents/${dirPath}?ref=${githubBranch}`;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (githubToken) {
    headers['Authorization'] = `token ${githubToken}`;
  }

  console.log(`Fetching from GitHub API: ${url}`);
  const res = await fetch(url, { headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

async function importAssets() {
  console.log(`Starting GitHub Import from repo: "${githubRepo}" [branch: ${githubBranch}]...`);
  
  // Load existing projects from JSON
  let projects: ProjectWithMedia[] = [];
  if (fs.existsSync(jsonPath)) {
    try {
      const dataStr = fs.readFileSync(jsonPath, 'utf8');
      projects = JSON.parse(dataStr);
      console.log(`Loaded ${projects.length} existing project(s) from local projects.json`);
    } catch (e) {
      console.warn('Could not read existing projects.json, starting fresh:', e);
      projects = [];
    }
  }

  let projectsCreated = 0;
  let mediaAddedCount = 0;

  for (const dirPath of githubPaths) {
    const trimmedPath = dirPath.trim();
    if (!trimmedPath) continue;
    
    console.log(`\n--- Processing path: ${trimmedPath} ---`);
    try {
      const files = await fetchGitHubDirectory(githubRepo, trimmedPath);
      const mediaFiles = files.filter(f => f.type === 'file' && f.download_url);
      
      console.log(`Found ${mediaFiles.length} file(s) in "${trimmedPath}".`);
      
      for (const file of mediaFiles) {
        const ext = path.extname(file.name).toLowerCase();
        // Only import common media types
        if (!['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.mp4', '.mov', '.webm'].includes(ext)) {
          console.log(`Skipping non-media file: ${file.name}`);
          continue;
        }

        const category = inferCategory(file.path, file.name);
        const mediaType = getMediaType(file.name);
        
        // Define slug based on file name (e.g. awesome-logo.png -> awesome-logo)
        const nameWithoutExt = path.basename(file.name, ext);
        const slug = slugify(nameWithoutExt);
        const title = cleanTitle(slug);

        console.log(`Processing asset: "${file.name}" -> Category: "${category}", Slug: "${slug}"`);

        // Check if project exists in local array
        let project = projects.find(p => p.slug === slug);
        
        if (project) {
          console.log(`  Project with slug "${slug}" already exists (ID: ${project.id}).`);
        } else {
          console.log(`  Creating new project object: "${title}"`);
          project = {
            id: randomUUID(),
            title,
            slug,
            category,
            description: `Imported asset from GitHub repository path ${file.path}.`,
            tools: [category === 'logo' || category === 'flyer' ? 'Adobe Illustrator' : 'Figma'],
            live_url: null,
            featured: false,
            sort_order: 0,
            created_at: new Date().toISOString(),
            project_media: [],
          };
          projects.push(project);
          projectsCreated++;
        }

        // Formulate the raw GitHub CDN URL for this asset
        const rawUrl = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/${file.path}`;

        // Check if media is already linked
        const mediaExists = project.project_media.some(m => m.storage_path === rawUrl);

        if (mediaExists) {
          console.log(`  Media entry already exists for project ID ${project.id} and path "${rawUrl}".`);
        } else {
          const position = project.project_media.length;
          project.project_media.push({
            id: randomUUID(),
            project_id: project.id,
            media_type: mediaType,
            storage_path: rawUrl,
            position,
          });
          mediaAddedCount++;
          console.log(`  Linked media to project successfully (Position: ${position}).`);
        }
      }

    } catch (err: any) {
      console.error(`Failed to process directory "${dirPath}":`, err.message);
    }
  }

  // Write updated data back to JSON
  // Ensure parent directory exists
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(projects, null, 2), 'utf8');

  console.log('\nGitHub asset import process complete.');
  console.log(`Summary: Created ${projectsCreated} projects, linked ${mediaAddedCount} new media assets.`);
}

importAssets().catch(err => {
  console.error('Fatal import script error:', err);
});
