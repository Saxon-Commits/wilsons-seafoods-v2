'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const AdminSidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'Products', href: '/admin/products', icon: '🐟' },
        { label: 'Homepage', href: '/admin/homepage', icon: '🏠' },
        { label: 'Blog', href: '/admin/blog', icon: '📝' },
        { label: 'Reviews', href: '/admin/reviews', icon: '⭐' },
        { label: 'Messages', href: '/admin/messages', icon: '💬' },
        { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 md:hidden bg-slate-800 p-2 rounded-md text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 p-6 transition-transform duration-300 ease-in-out shadow-2xl h-screen flex flex-col
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-white text-2xl font-bold font-serif">
                        Admin Panel
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden text-slate-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation - Scrollable */}
                <nav className="flex-1 overflow-y-auto min-h-0 mb-6">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                    flex items-center space-x-3 w-full text-left p-3 rounded-md transition-colors text-lg
                    ${isActive(item.href)
                                            ? 'bg-brand-blue text-white'
                                            : 'text-slate-300 hover:bg-slate-700'
                                        }
                  `}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer Actions - Always visible at bottom */}
                <div className="border-t border-slate-700 pt-4 space-y-2 flex-shrink-0">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm"
                    >
                        <span>←</span>
                        <span>View Site</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
