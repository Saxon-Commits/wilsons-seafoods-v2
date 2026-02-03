'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/types';

interface BlogListClientProps {
    posts: BlogPost[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ posts }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
            {/* Hero Section */}
            <section className="relative pt-40 pb-16 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Page Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
                            Seafood Blog
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            Fresh seafood tips, recipes, and news from Tasmania's trusted seafood experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="container mx-auto px-6 pb-20">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-xl">No blog posts yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-brand-blue transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20"
                            >
                                {post.featured_image_url && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.featured_image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                                        <span>{post.author || "Wilson's Seafoods Team"}</span>
                                        <span>•</span>
                                        <time dateTime={post.published_at} suppressHydrationWarning>
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString('en-AU', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })
                                                : 'Recently'}
                                        </time>
                                    </div>

                                    <h2 className="text-2xl font-serif font-bold text-white mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>

                                    {post.excerpt && (
                                        <p className="text-slate-300 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 font-medium transition-colors group"
                                    >
                                        Read More
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default BlogListClient;
