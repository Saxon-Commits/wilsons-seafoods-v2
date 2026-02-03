import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
    title: 'Blog - Fresh Seafood Tips & News',
    description: "Read the latest seafood tips, recipes, and news from Wilson's Seafoods. Your trusted source for fresh Tasmanian seafood expertise.",
    keywords: ['seafood blog', 'seafood recipes', 'Tasmania seafood', 'cooking tips', 'fresh fish'],
};

export const revalidate = 600; // 10 minutes

async function getData() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (error) throw error;

        return { posts: data || [] };
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return { posts: [] };
    }
}

export default async function BlogPage() {
    const data = await getData();

    return <BlogListClient posts={data.posts} />;
}
