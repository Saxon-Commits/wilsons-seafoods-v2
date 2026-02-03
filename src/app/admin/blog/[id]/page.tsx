import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import EditBlogPostClient from './EditBlogPostClient';

export const metadata: Metadata = {
    title: 'Edit Blog Post - Admin',
    robots: 'noindex, nofollow',
};

interface Props {
    params: { id: string };
}

async function getPost(id: string) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', parseInt(id))
            .single();

        if (error || !data) return null;
        return data;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export default async function EditBlogPostPage({ params }: Props) {
    const { id } = await params; // Next.js 15 requires awaiting params
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-serif">Edit Blog Post</h1>
            </div>
            <EditBlogPostClient post={post} />
        </div>
    );
}
