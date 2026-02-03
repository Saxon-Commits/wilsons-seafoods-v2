-- Add new columns for blog editor features
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Update existing posts to have updated_at if null
UPDATE blog_posts SET updated_at = created_at WHERE updated_at IS NULL;
