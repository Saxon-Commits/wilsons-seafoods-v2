'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HomepageContent } from '@/types';
import { updateHomepageContent, uploadHomepageImage } from './actions';

interface HomepageAdminClientProps {
    content: HomepageContent;
}

const HomepageAdminClient: React.FC<HomepageAdminClientProps> = ({ content }) => {
    const router = useRouter();
    const aboutImageRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleContentChange = async (field: keyof HomepageContent, value: string) => {
        const result = await updateHomepageContent(field, value);
        if (!result.success) {
            alert(result.error || 'Failed to update content');
        }
    };

    const handleImageUpload = async (field: string, file: File | null) => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        const result = await uploadHomepageImage(formData, field);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to upload image');
        }

        setUploading(false);
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Hero Section</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Hero Title</label>
                        <input
                            type="text"
                            value={content.hero_title || ''}
                            onChange={(e) => handleContentChange('hero_title', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Hero Subtitle</label>
                        <textarea
                            value={content.hero_subtitle || ''}
                            onChange={(e) => handleContentChange('hero_subtitle', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            {/* Announcement Banner */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Announcement Banner</h2>
                <div>
                    <label className="block text-base font-medium text-slate-300 mb-2">Announcement Text</label>
                    <input
                        type="text"
                        value={content.announcement_text || ''}
                        onChange={(e) => handleContentChange('announcement_text', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                    />
                </div>
            </div>

            {/* About Section */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">About Section</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">About Text</label>
                        <textarea
                            value={content.about_text || ''}
                            onChange={(e) => handleContentChange('about_text', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            rows={5}
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">About Image</label>
                        <input
                            ref={aboutImageRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('about_image_url', e.target.files?.[0] || null)}
                            className="w-full text-base text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-300 hover:file:bg-slate-600 transition-colors"
                            disabled={uploading}
                        />
                        {content.about_image_url && (
                            <img src={content.about_image_url} alt="About" className="mt-2 rounded-md max-h-48 object-cover" />
                        )}
                    </div>
                </div>
            </div>

            {/* Gateway Cards */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Gateway Card 1</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Image</label>
                        <div className="flex items-start gap-4">
                            {content.gateway1_image_url && (
                                <img
                                    src={content.gateway1_image_url}
                                    alt="Gateway Card 1"
                                    className="w-32 h-24 object-cover rounded-md border border-slate-600"
                                />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload('gateway1_image_url', e.target.files?.[0] || null)}
                                    disabled={uploading}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                                />
                                <p className="text-xs text-slate-400 mt-1">Upload a new image to replace the current one</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Title</label>
                        <input
                            type="text"
                            value={content.gateway1_title || ''}
                            onChange={(e) => handleContentChange('gateway1_title', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Description</label>
                        <textarea
                            value={content.gateway1_description || ''}
                            onChange={(e) => handleContentChange('gateway1_description', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-base font-medium text-slate-300 mb-2">Button Text</label>
                            <input
                                type="text"
                                value={content.gateway1_button_text || ''}
                                onChange={(e) => handleContentChange('gateway1_button_text', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-base font-medium text-slate-300 mb-2">Button URL</label>
                            <input
                                type="text"
                                value={content.gateway1_button_url || ''}
                                onChange={(e) => handleContentChange('gateway1_button_url', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Gateway Card 2</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Image</label>
                        <div className="flex items-start gap-4">
                            {content.gateway2_image_url && (
                                <img
                                    src={content.gateway2_image_url}
                                    alt="Gateway Card 2"
                                    className="w-32 h-24 object-cover rounded-md border border-slate-600"
                                />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload('gateway2_image_url', e.target.files?.[0] || null)}
                                    disabled={uploading}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                                />
                                <p className="text-xs text-slate-400 mt-1">Upload a new image to replace the current one</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Title</label>
                        <input
                            type="text"
                            value={content.gateway2_title || ''}
                            onChange={(e) => handleContentChange('gateway2_title', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Description</label>
                        <textarea
                            value={content.gateway2_description || ''}
                            onChange={(e) => handleContentChange('gateway2_description', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-base font-medium text-slate-300 mb-2">Button Text</label>
                            <input
                                type="text"
                                value={content.gateway2_button_text || ''}
                                onChange={(e) => handleContentChange('gateway2_button_text', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-base font-medium text-slate-300 mb-2">Button URL</label>
                            <input
                                type="text"
                                value={content.gateway2_button_url || ''}
                                onChange={(e) => handleContentChange('gateway2_button_url', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomepageAdminClient;
