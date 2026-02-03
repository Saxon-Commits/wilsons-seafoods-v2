import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import BlogPostClient from './BlogPostClient';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; // Next.js 15 requires awaiting params
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('blog_posts')
        .select('title, excerpt, meta_description, featured_image_url')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const description = post.meta_description || post.excerpt || `Read ${post.title} on Wilson's Seafoods blog`;
    const imageUrl = post.featured_image_url || '/images/logo.png';

    return {
        title: `${post.title} | Wilson's Seafoods Blog`,
        description,
        keywords: ['Wilson\'s Seafoods', 'Tasmania seafood', 'fresh seafood', 'seafood blog'],
        openGraph: {
            title: post.title,
            description,
            images: [imageUrl],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images: [imageUrl],
        },
    };
}

export const revalidate = 600; // 10 minutes

async function getData(slug: string) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error || !data) return null;

        return data;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params; // Next.js 15 requires awaiting params
    const post = await getData(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || '',
        image: post.featured_image_url || '',
        datePublished: post.published_at,
        dateModified: post.updated_at || post.published_at,
        author: {
            '@type': 'Organization',
            name: post.author || "Wilson's Seafoods",
        },
        publisher: {
            '@type': 'Organization',
            name: "Wilson's Seafoods",
            logo: {
                '@type': 'ImageObject',
                url: 'https://wilsonsseafoods.com.au/images/logo.png',
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient post={post} />
        </>
    );
}
