-- =====================================================
-- SQL Script to Add Image Upload Columns
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add about_image_url column to homepage_content table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'homepage_content' 
        AND column_name = 'about_image_url'
    ) THEN
        ALTER TABLE homepage_content 
        ADD COLUMN about_image_url TEXT;
        
        RAISE NOTICE 'Added about_image_url column to homepage_content table';
    ELSE
        RAISE NOTICE 'about_image_url column already exists in homepage_content table';
    END IF;
END $$;

-- Add background_url column to site_settings table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'site_settings' 
        AND column_name = 'background_url'
    ) THEN
        ALTER TABLE site_settings 
        ADD COLUMN background_url TEXT;
        
        RAISE NOTICE 'Added background_url column to site_settings table';
    ELSE
        RAISE NOTICE 'background_url column already exists in site_settings table';
    END IF;
END $$;

-- Verify the columns were added
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name IN ('homepage_content', 'site_settings')
    AND column_name IN ('about_image_url', 'background_url')
ORDER BY table_name, column_name;
