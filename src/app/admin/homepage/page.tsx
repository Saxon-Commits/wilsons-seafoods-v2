import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import HomepageAdminClient from './HomepageAdminClient';

export const metadata: Metadata = {
    title: 'Homepage Editor - Admin',
    robots: 'noindex, nofollow',
};

async function getData() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('homepage_content')
            .select('*')
            .single();

        if (error) throw error;

        return { content: data };
    } catch (error) {
        console.error('Error fetching homepage content:', error);
        return {
            content: {
                hero_title: '',
                hero_subtitle: '',
                announcement_text: '',
                about_text: '',
                about_image_url: '',
                gateway_card_1_title: '',
                gateway_card_1_description: '',
                gateway_card_1_button_text: '',
                gateway_card_1_button_url: '',
                gateway_card_1_image_url: '',
                gateway_card_2_title: '',
                gateway_card_2_description: '',
                gateway_card_2_button_text: '',
                gateway_card_2_button_url: '',
                gateway_card_2_image_url: '',
            },
        };
    }
}

export default async function HomepageAdminPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Homepage Content</h1>
            <HomepageAdminClient {...data} />
        </div>
    );
}
