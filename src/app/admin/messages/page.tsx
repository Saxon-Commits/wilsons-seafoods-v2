import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import MessagesAdminClient from './MessagesAdminClient';

export const metadata: Metadata = {
    title: 'Messages - Admin',
    robots: 'noindex, nofollow',
};

async function getData() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return { messages: data || [] };
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { messages: [] };
    }
}

export default async function MessagesAdminPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Messages</h1>
            <MessagesAdminClient {...data} />
        </div>
    );
}
