'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/types';

interface BlogPostClientProps {
    post: BlogPost;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
            <div className="container mx-auto px-6 pt-40 pb-12 max-w-4xl">
                {/* Article */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
                >
                    {/* Featured Image */}
                    {post.featured_image_url && (
                        <div className="relative h-64 md:h-96 overflow-hidden">
                            <Image
                                src={post.featured_image_url}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 896px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-slate-400 mb-6">
                            <span className="font-medium">{post.author || "Wilson's Seafoods Team"}</span>
                            <span>•</span>
                            <time dateTime={post.published_at}>
                                {post.published_at
                                    ? new Date(post.published_at).toLocaleDateString('en-AU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                    : 'Recently'}
                            </time>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-xl text-slate-300 mb-8 italic border-l-4 border-brand-blue pl-6">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Post Content */}
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </motion.article>

                {/* Back to Blog */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 font-medium transition-colors group"
                    >
                        <svg
                            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPostClient;
