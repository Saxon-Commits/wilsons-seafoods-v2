import React from 'react';
import { Metadata } from 'next';
import NewBlogPostClient from './NewBlogPostClient';

export const metadata: Metadata = {
    title: 'New Blog Post - Admin',
    robots: 'noindex, nofollow',
};

export default function NewBlogPostPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-serif">Create New Blog Post</h1>
            </div>
            <NewBlogPostClient />
        </div>
    );
}
