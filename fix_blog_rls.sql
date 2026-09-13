-- Fix blog_posts RLS: allow public read access
-- Run this in the Supabase SQL Editor (your project > SQL Editor)

-- This allows anyone (including unauthenticated users) to read ALL blog posts.
-- This is needed because both the public blog page and the admin panel
-- use the anon key to fetch posts (including unpublished drafts in the admin).
CREATE POLICY "Public can read all blog posts"
ON public.blog_posts
FOR SELECT
USING (true);
