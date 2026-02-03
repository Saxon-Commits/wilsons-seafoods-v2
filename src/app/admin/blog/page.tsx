import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import BlogAdminClient from './BlogAdminClient';

export const metadata: Metadata = {
    title: 'Blog Management - Admin',
    robots: 'noindex, nofollow',
};

async function getData() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('published_at', { ascending: false });

        if (error) throw error;

        return { posts: data || [] };
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return { posts: [] };
    }
}

export default async function BlogAdminPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Blog Posts</h1>
            <BlogAdminClient {...data} />
        </div>
    );
}
