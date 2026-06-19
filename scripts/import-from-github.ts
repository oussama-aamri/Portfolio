import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const githubToken = process.env.GITHUB_TOKEN || '';

// Configurable repo and path - can be set in env or passed as args
const githubRepo = process.env.GITHUB_REPO || 'osama/Portfolio'; // Fallback
const githubPaths = (process.env.GITHUB_PATHS || 'assets/logos,assets/flyers,assets/instagram').split(',');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in your environment.');
  process.exit(1);
}

// Initialize Supabase Admin Client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
  const url = `https://api.github.com/repos/${repo}/contents/${dirPath}`;
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

async function downloadFileAsBuffer(downloadUrl: string): Promise<Buffer> {
  const res = await fetch(downloadUrl);
  if (!res.ok) {
    throw new Error(`Failed to download file from ${downloadUrl}: ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function importAssets() {
  console.log(`Starting GitHub Import from repo: "${githubRepo}"...`);
  
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

        // 1. Check/Insert placeholder project
        let projectId: string;
        
        const { data: existingProject, error: fetchError } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', slug)
          .single();
          
        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error(`Error querying projects for slug "${slug}":`, fetchError);
          continue;
        }

        if (existingProject) {
          projectId = existingProject.id;
          console.log(`  Project with slug "${slug}" already exists (ID: ${projectId}).`);
        } else {
          console.log(`  Creating placeholder project: "${title}"`);
          const { data: newProject, error: insertError } = await supabase
            .from('projects')
            .insert({
              title,
              slug,
              category,
              description: `Imported asset from GitHub repository path ${file.path}.`,
              tools: [category === 'logo' || category === 'flyer' ? 'Adobe Illustrator' : 'Figma'],
              featured: false,
              sort_order: 0,
            })
            .select('id')
            .single();

          if (insertError || !newProject) {
            console.error(`  Error creating project "${title}":`, insertError);
            continue;
          }
          projectId = newProject.id;
          console.log(`  Created project ID: ${projectId}`);
        }

        // 2. Download raw file content from GitHub
        console.log(`  Downloading file content...`);
        const fileBuffer = await downloadFileAsBuffer(file.download_url!);

        // 3. Upload to Supabase Storage bucket "portfolio-media"
        // Storage path layout: category/slug-uuid.ext
        const storagePath = `${category}/${slug}${ext}`;
        console.log(`  Uploading to storage bucket "portfolio-media" as "${storagePath}"...`);
        
        // Infer correct content-type
        let contentType = 'image/png';
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.webp') contentType = 'image/webp';
        else if (ext === '.svg') contentType = 'image/svg+xml';
        else if (ext === '.mp4') contentType = 'video/mp4';
        else if (ext === '.mov') contentType = 'video/quicktime';
        else if (ext === '.webm') contentType = 'video/webm';

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio-media')
          .upload(storagePath, fileBuffer, {
            contentType,
            upsert: true,
          });

        if (uploadError) {
          console.error(`  Failed to upload to Supabase storage:`, uploadError);
          continue;
        }

        console.log(`  Uploaded successfully:`, uploadData.path);

        // 4. Create project_media record linked to this project
        // Check if media already linked
        const { data: existingMedia, error: mediaQueryError } = await supabase
          .from('project_media')
          .select('id')
          .eq('project_id', projectId)
          .eq('storage_path', storagePath)
          .single();

        if (mediaQueryError && mediaQueryError.code !== 'PGRST116') {
          console.error(`  Error checking existing media:`, mediaQueryError);
          continue;
        }

        if (existingMedia) {
          console.log(`  Media entry already exists for project ID ${projectId} and storage path "${storagePath}".`);
        } else {
          // Get next position index
          const { data: posData } = await supabase
            .from('project_media')
            .select('position')
            .eq('project_id', projectId)
            .order('position', { ascending: false })
            .limit(1);
          
          const position = posData && posData.length > 0 ? posData[0].position + 1 : 0;

          const { error: mediaInsertError } = await supabase
            .from('project_media')
            .insert({
              project_id: projectId,
              media_type: mediaType,
              storage_path: storagePath,
              position,
            });

          if (mediaInsertError) {
            console.error(`  Error linking project media:`, mediaInsertError);
          } else {
            console.log(`  Linked media to project successfully (Position: ${position}).`);
          }
        }
      }

    } catch (err: any) {
      console.error(`Failed to process directory "${dirPath}":`, err.message);
    }
  }
  
  console.log('\nGitHub asset import process complete.');
}

importAssets().catch(err => {
  console.error('Fatal import script error:', err);
});
