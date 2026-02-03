import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    robots: 'noindex, nofollow',
};

async function getData() {
    const supabase = await createClient();

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('id, is_fresh');

        if (error) throw error;

        const totalCount = products?.length || 0;
        const freshCount = products?.filter(p => p.is_fresh).length || 0;

        return { totalCount, freshCount };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return { totalCount: 0, freshCount: 0 };
    }
}

export default async function AdminDashboardPage() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">
                Dashboard
            </h1>
            <AdminDashboardClient {...data} />
        </div>
    );
}
