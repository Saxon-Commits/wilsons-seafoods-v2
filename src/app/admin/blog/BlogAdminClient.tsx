'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types';
import { deleteBlogPost } from './actions';
import Link from 'next/link';

interface BlogAdminClientProps {
    posts: BlogPost[];
}

const BlogAdminClient: React.FC<BlogAdminClientProps> = ({ posts }) => {
    const router = useRouter();

    const handleDelete = async (id: number, title: string) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        const result = await deleteBlogPost(id);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to delete post');
        }
    };

    return (
        <div className="space-y-6">
            {/* New Post Button */}
            <div className="flex justify-end">
                <Link
                    href="/admin/blog/new"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                    <span>➕</span>
                    New Blog Post
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700 text-center">
                    <p className="text-slate-400 text-lg mb-4">No blog posts yet.</p>
                    <p className="text-slate-500 text-sm">
                        Click "New Blog Post" above to create your first post!
                    </p>
                </div>
            ) : (
                <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700 space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-slate-700 p-5 rounded-md border border-slate-600"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-white">{post.title}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${post.published
                                                    ? 'bg-green-900/30 text-green-400'
                                                    : 'bg-slate-600 text-slate-400'
                                                }`}
                                        >
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-2">/{post.slug}</p>
                                    {post.excerpt && (
                                        <p className="text-slate-300 text-sm line-clamp-2">{post.excerpt}</p>
                                    )}
                                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                                        <span>{post.category || 'Uncategorized'}</span>
                                        <span>•</span>
                                        <span>
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString()
                                                : 'Not published'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/blog/${post.id}`}
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1.5 rounded bg-blue-900/20 hover:bg-blue-900/30 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <a
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-slate-300 text-sm font-medium px-3 py-1.5 rounded bg-slate-600 hover:bg-slate-500 transition-colors"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => post.id && handleDelete(post.id, post.title)}
                                        className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1.5 rounded bg-red-900/20 hover:bg-red-900/30 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogAdminClient;
