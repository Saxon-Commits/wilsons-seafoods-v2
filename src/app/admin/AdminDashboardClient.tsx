'use client';

import React from 'react';

interface AdminDashboardClientProps {
    totalCount: number;
    freshCount: number;
}

const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
    totalCount,
    freshCount,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
                <h3 className="text-slate-400 text-lg mb-2">Total Products</h3>
                <p className="text-4xl font-bold text-white">{totalCount}</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
                <h3 className="text-slate-400 text-lg mb-2">"Fresh Today" Items</h3>
                <p className="text-4xl font-bold text-white">{freshCount}</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
                <h3 className="text-slate-400 text-lg mb-2">Hidden Products</h3>
                <p className="text-4xl font-bold text-white">{totalCount - freshCount}</p>
                <p className="text-xs text-slate-500 mt-1">Includes non-visible items</p>
            </div>
        </div>
    );
};

export default AdminDashboardClient;
