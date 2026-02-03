import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import ProductsAdminClient from './ProductsAdminClient';

export const metadata: Metadata = {
    title: 'Manage Products - Admin',
    robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic'; // Force fresh data, no caching

async function getData() {
    const supabase = await createClient();

    try {
        const [productsResult, settingsResult] = await Promise.all([
            supabase.from('products').select('*').order('sort_order', { ascending: true }),
            supabase.from('site_settings').select('categories').single(),
        ]);

        return {
            products: productsResult.data || [],
            categories: settingsResult.data?.categories || ['Fresh Fish', 'Shellfish', 'Frozen'],
        };
    } catch (error) {
        console.error('Error fetching products data:', error);
        return {
            products: [],
            categories: ['Fresh Fish', 'Shellfish', 'Frozen'],
        };
    }
}

export default async function ProductsAdminPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Products</h1>
            <ProductsAdminClient {...data} />
        </div>
    );
}
