const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkBlogPost() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published')
        .eq('slug', 'seafood-labelling-laws-2026-tasmanian-provenance')
        .single();

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Blog Post Data:');
        console.log(JSON.stringify(data, null, 2));
    }
}

checkBlogPost();
