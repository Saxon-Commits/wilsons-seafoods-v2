import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import { OPENING_HOURS } from '@/constants';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Wilson's Seafoods. Visit our store in Glenorchy, call us, or send us a message. We're here to help with all your seafood needs.",
    keywords: ["contact Wilson's Seafoods", "Glenorchy seafood store", "wholesale seafood inquiry", "Tasmania fish market contact", "seafood delivery Tasmania"],
};

export const revalidate = 600; // Revalidate every 10 minutes

async function getData() {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('phone_number, opening_hours')
            .single();

        if (error) {
            console.error('Error fetching contact data:', error);
            return {
                phoneNumber: '(03) 6272 6600',
                hours: OPENING_HOURS,
            };
        }

        return {
            phoneNumber: data?.phone_number || '(03) 6272 6600',
            hours: data?.opening_hours || OPENING_HOURS,
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            phoneNumber: '(03) 6272 6600',
            hours: OPENING_HOURS,
        };
    }
}

export default async function ContactPage() {
    const data = await getData();

    return <ContactPageClient {...data} />;
}
