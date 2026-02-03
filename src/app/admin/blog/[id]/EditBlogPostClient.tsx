'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TipTapEditor from '@/components/admin/TipTapEditor';
import { updateBlogPost } from '../actions';
import { BlogPost } from '@/types';

interface EditBlogPostClientProps {
    post: BlogPost;
}

const EditBlogPostClient: React.FC<EditBlogPostClientProps> = ({ post }) => {
    const router = useRouter();
    const [title, setTitle] = useState(post.title);
    const [slug, setSlug] = useState(post.slug);
    const [excerpt, setExcerpt] = useState(post.excerpt || '');
    const [content, setContent] = useState(post.content);
    const [author, setAuthor] = useState(post.author || "Wilson's Seafoods Team");
    const [category, setCategory] = useState(post.category || '');
    const [featuredImageUrl, setFeaturedImageUrl] = useState(post.featured_image_url || '');
    const [metaDescription, setMetaDescription] = useState(post.meta_description || '');
    const [published, setPublished] = useState(post.published);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('excerpt', excerpt);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('featured_image_url', featuredImageUrl);
        formData.append('meta_description', metaDescription);
        formData.append('published', published.toString());

        const result = await updateBlogPost(post.id!, formData);

        if (result.success) {
            router.push('/admin/blog');
            router.refresh();
        } else {
            alert(result.error || 'Failed to update post');
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Slug *
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <p className="text-xs text-slate-400 mt-1">URL: /blog/{slug}</p>
                </div>
            </div>

            {/* Excerpt */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Excerpt (brief summary)
                </label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Content Editor */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Content *
                </label>
                <TipTapEditor content={content} onChange={setContent} />
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Recipes, Catch of the Day"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Featured Image & Meta Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Featured Image URL
                    </label>
                    <input
                        type="url"
                        value={featuredImageUrl}
                        onChange={(e) => setFeaturedImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Meta Description (SEO)
                    </label>
                    <input
                        type="text"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Brief description for search engines"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-300">
                    Published
                </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {saving ? 'Saving...' : 'Update Post'}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/blog')}
                    className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditBlogPostClient;
