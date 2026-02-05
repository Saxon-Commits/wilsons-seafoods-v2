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
    const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
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
        formData.append('meta_description', metaDescription);
        formData.append('published', published.toString());

        // Add image file or URL
        if (featuredImageFile) {
            formData.append('featured_image', featuredImageFile);
        } else if (featuredImageUrl && !featuredImageUrl.startsWith('data:')) {
            formData.append('featured_image_url', featuredImageUrl);
        }

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

            {/* Featured Image */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Featured Image
                </label>
                <div className="space-y-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFeaturedImageFile(file);
                                // Create preview
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setFeaturedImageUrl(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <p className="text-xs text-slate-400">Or enter an image URL:</p>
                    <input
                        type="url"
                        value={featuredImageUrl.startsWith('data:') ? '' : featuredImageUrl}
                        onChange={(e) => {
                            setFeaturedImageUrl(e.target.value);
                            setFeaturedImageFile(null);
                        }}
                        placeholder="https://..."
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {featuredImageUrl && (
                        <div className="relative">
                            <img
                                src={featuredImageUrl}
                                alt="Preview"
                                className="w-full max-h-48 object-cover rounded-md border border-slate-600"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setFeaturedImageUrl('');
                                    setFeaturedImageFile(null);
                                }}
                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Meta Description */}
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
