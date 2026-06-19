-- Create projects table
CREATE TABLE projects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('logo', 'flyer', 'instagram', 'website', 'video')),
  description   TEXT,
  tools         TEXT[] DEFAULT '{}',
  live_url      TEXT, -- for website category
  featured      BOOLEAN DEFAULT false,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Create project_media table
CREATE TABLE project_media (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID REFERENCES projects(id) ON DELETE CASCADE,
  media_type    TEXT CHECK (media_type IN ('image', 'video')),
  storage_path  TEXT NOT NULL, -- path in Supabase Storage bucket
  position      INT DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

-- Create Policies for public read access (no authentication required)
CREATE POLICY "Allow public read access on projects"
ON projects FOR SELECT
TO public
USING (true);

-- Create Policies for public read access on project_media
CREATE POLICY "Allow public read access on project_media"
ON project_media FOR SELECT
TO public
USING (true);

-- Create Policies for service_role to manage (insert, update, delete) projects
CREATE POLICY "Allow service_role full access on projects"
ON projects FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create Policies for service_role to manage (insert, update, delete) project_media
CREATE POLICY "Allow service_role full access on project_media"
ON project_media FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
