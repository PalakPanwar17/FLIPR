/*
# Create Initial Schema for Project Management Platform

## 1. New Tables

### projects
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, not null)
- `description` (text, not null)
- `image_url` (text, not null)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

### clients
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, not null)
- `designation` (text, not null)
- `description` (text, not null)
- `image_url` (text, not null)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

### contact_submissions
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text, not null)
- `message` (text, not null)
- `is_read` (boolean, default: false)
- `submitted_at` (timestamptz, default: now())

### newsletter_subscribers
- `id` (uuid, primary key, default: gen_random_uuid())
- `email` (text, unique, not null)
- `subscribed_at` (timestamptz, default: now())

## 2. Storage Bucket
- Create bucket: `app-8c7dnh39ps75_project_images`
- Max file size: 1MB
- Allowed MIME types: image/jpeg, image/png, image/gif, image/webp

## 3. Security
- No RLS enabled (public access for all tables as no login system is required)
- Public read/write access for all tables
- Public upload access for storage bucket
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  submitted_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'app-8c7dnh39ps75_project_images',
  'app-8c7dnh39ps75_project_images',
  true,
  1048576,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public access
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'app-8c7dnh39ps75_project_images')
WITH CHECK (bucket_id = 'app-8c7dnh39ps75_project_images');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
