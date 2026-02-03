import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import { INITIAL_HOMEPAGE_CONTENT, OPENING_HOURS } from '@/constants';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: "Home",
  description: "Wilson's Seafoods - Fresh Tasmanian Seafood in Glenorchy. Premium quality, locally sourced seafood delivered fresh daily.",
};

export const revalidate = 300; // Revalidate every 5 minutes

async function getData() {
  const supabase = createClient();

  try {
    // Fetch all data in parallel
    const [productsResult, settingsResult, contentResult, reviewsResult] = await Promise.all([
      supabase.from('products').select('*').eq('is_visible', true).eq('featured', true).neq('category', 'Out of Stock').order('sort_order', { ascending: true }).limit(6),
      supabase.from('site_settings').select('*').single(),
      supabase.from('homepage_content').select('*').single(),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(6),
    ]);

    return {
      products: productsResult.data || [],
      settings: settingsResult.data || null,
      content: contentResult.data || INITIAL_HOMEPAGE_CONTENT,
      hours: settingsResult.data?.opening_hours || OPENING_HOURS,
      categories: settingsResult.data?.categories || ['Fresh Fish', 'Shellfish', 'Frozen'],
      reviews: reviewsResult.data || [],
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      products: [],
      settings: null,
      content: INITIAL_HOMEPAGE_CONTENT,
      hours: OPENING_HOURS,
      categories: ['Fresh Fish', 'Shellfish', 'Frozen'],
      reviews: [],
    };
  }
}

export default async function HomePage() {
  const data = await getData();

  return <HomePageClient {...data} />;
}
