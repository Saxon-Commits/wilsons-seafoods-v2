'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
    logoUrl: string;
    socialLinks: { facebook: string; instagram: string };
    abn: string;
    phoneNumber: string;
    children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({
    logoUrl,
    socialLinks,
    abn,
    phoneNumber,
    children,
}) => {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Header logo={logoUrl} />}
            {children}
            {!isAdminRoute && <Footer socialLinks={socialLinks} abn={abn} phoneNumber={phoneNumber} />}
        </>
    );
};

export default ConditionalLayout;
