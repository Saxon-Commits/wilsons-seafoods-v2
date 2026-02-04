import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import { INITIAL_HOMEPAGE_CONTENT } from '@/constants';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Wilson's Seafoods - your trusted source for premium fresh Tasmanian seafood since 1995. Locally sourced, sustainably caught, family-owned business in Glenorchy.",
    keywords: ["about Wilson's Seafoods", "Tasmanian seafood supplier", "sustainable fishing Tasmania", "family seafood business", "Glenorchy fish market"],
};

export const revalidate = 600; // Revalidate every 10 minutes

async function getData() {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('homepage_content')
            .select('about_text, about_image_url')
            .single();

        if (error) {
            console.error('Error fetching about content:', error);
            return {
                aboutText: INITIAL_HOMEPAGE_CONTENT.about_text,
                aboutImageUrl: INITIAL_HOMEPAGE_CONTENT.about_image_url,
            };
        }

        return {
            aboutText: data?.about_text || INITIAL_HOMEPAGE_CONTENT.about_text,
            aboutImageUrl: data?.about_image_url || INITIAL_HOMEPAGE_CONTENT.about_image_url,
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            aboutText: INITIAL_HOMEPAGE_CONTENT.about_text,
            aboutImageUrl: INITIAL_HOMEPAGE_CONTENT.about_image_url,
        };
    }
}

export default async function AboutPage() {
    const data = await getData();

    return <AboutPageClient {...data} />;
}
