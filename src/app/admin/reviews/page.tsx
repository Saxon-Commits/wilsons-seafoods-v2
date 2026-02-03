import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import ReviewsAdminClient from './ReviewsAdminClient';

export const metadata: Metadata = {
    title: 'Reviews Management - Admin',
    robots: 'noindex, nofollow',
};

async function getData() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return { reviews: data || [] };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return { reviews: [] };
    }
}

export default async function ReviewsAdminPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Customer Reviews</h1>
            <ReviewsAdminClient {...data} />
        </div>
    );
}
