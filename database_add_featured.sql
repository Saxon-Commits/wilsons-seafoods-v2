-- Add featured column to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Set up to 6 existing products as featured (first 6 visible products)
UPDATE products 
SET featured = true 
WHERE id IN (
  SELECT id 
  FROM products 
  WHERE is_visible = true 
  ORDER BY sort_order ASC 
  LIMIT 6
);
