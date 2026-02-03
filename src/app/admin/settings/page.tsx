import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import SettingsAdminClient from './SettingsAdminClient';
import { OPENING_HOURS } from '@/constants';

export const metadata: Metadata = {
    title: 'Settings - Admin',
    robots: 'noindex, nofollow',
};

async function getData() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (error) throw error;

        return {
            logoUrl: data.logo_url || '',
            backgroundUrl: data.background_url || '',
            categories: data.categories || [],
            socialLinks: data.social_links || { facebook: '', instagram: '' },
            abn: data.abn || '',
            phoneNumber: data.phone_number || '',
            openingHours: data.opening_hours || OPENING_HOURS,
        };
    } catch (error) {
        console.error('Error fetching settings:', error);
        return {
            logoUrl: '',
            backgroundUrl: '',
            categories: [],
            socialLinks: { facebook: '', instagram: '' },
            abn: '',
            phoneNumber: '',
            openingHours: OPENING_HOURS,
        };
    }
}

export default async function SettingsAdminPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Settings</h1>
            <SettingsAdminClient {...data} />
        </div>
    );
}
