import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
    title: "Products",
    description: "Browse our full selection of fresh Tasmanian seafood. Locally sourced, sustainably caught fish, shellfish, and more delivered fresh daily.",
    keywords: ["seafood products", "fresh fish Tasmania", "Tasmanian shellfish", "buy seafood Glenorchy", "fresh seafood delivery"],
};

export const revalidate = 300; // Revalidate every 5 minutes

async function getData() {
    const supabase = createClient();

    try {
        // Fetch products and settings in parallel
        const [productsResult, settingsResult] = await Promise.all([
            supabase
                .from('products')
                .select('*')
                .eq('is_visible', true)
                .order('sort_order', { ascending: true }),
            supabase
                .from('site_settings')
                .select('categories')
                .single(),
        ]);

        return {
            products: productsResult.data || [],
            categories: settingsResult.data?.categories || ['All Products', 'Fresh Fish', 'Shellfish', 'Frozen'],
        };
    } catch (error) {
        console.error('Error fetching products data:', error);
        return {
            products: [],
            categories: ['All Products', 'Fresh Fish', 'Shellfish', 'Frozen'],
        };
    }
}

export default async function ProductsPage() {
    const data = await getData();

    return <ProductsPageClient {...data} />;
}
