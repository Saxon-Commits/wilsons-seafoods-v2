'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HeaderProps {
    logo: string;
}

const NavLink: React.FC<{
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}> = ({ href, children, isActive }) => {
    const isExternal = href.startsWith('http');

    const linkClasses = `text-slate-200 hover:text-brand-gold transition-colors duration-300 pb-1 border-b-2 ${isActive ? 'border-brand-gold text-brand-gold' : 'border-transparent hover:border-brand-gold'
        } text-base md:text-lg font-medium`;

    if (isExternal) {
        return (
            <li>
                <a
                    href={href}
                    className={linkClasses}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            </li>
        );
    }

    return (
        <li>
            <Link href={href} className={linkClasses}>
                {children}
            </Link>
        </li>
    );
};

const Header: React.FC<HeaderProps> = ({ logo }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const lastScrollY = useRef(0);
    const pathname = usePathname();

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroThreshold = window.innerHeight * 1.5; // 150vh - past gateway cards

            setScrollY(currentScrollY);

            // On homepage, keep header visible until past hero section
            if (pathname === '/') {
                if (currentScrollY < heroThreshold) {
                    setIsVisible(true);
                } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                // Other pages: normal auto-hide behavior
                if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // Close mobile menu when route changes
    useEffect(() => {
        closeMenu();
    }, [pathname]);

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Background Wrapper - transparent on homepage until past hero section */}
            <div className={`absolute inset-0 shadow-lg transition-all duration-300 ${pathname === '/' && scrollY < (typeof window !== 'undefined' ? window.innerHeight * 1.5 + 200 : 0)
                ? 'bg-transparent shadow-none'
                : 'bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900'
                }`}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center space-x-4 md:space-x-6 group">
                        <div className="flex-shrink-0 transform transition-transform group-hover:scale-105 duration-300 relative w-20 h-20 md:w-24 md:h-24">
                            <Image
                                src={logo}
                                alt="Wilsons Seafoods Logo"
                                fill
                                priority
                                className="rounded-full shadow-lg object-contain bg-white/5 border border-white/10 p-1.5 backdrop-blur-sm"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-white group-hover:text-brand-blue transition-colors">
                                Wilsons Seafoods
                            </h1>
                            <div className="mt-1 text-xs sm:text-sm text-slate-300 flex flex-col">
                                <span className="flex items-center gap-1">
                                    5 Sussex St, Glenorchy
                                </span>
                                <span className="text-brand-gold font-semibold">6272 6600</span>
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>
                            <NavLink href="/products" isActive={pathname === '/products'}>Products</NavLink>
                            <NavLink href="/about" isActive={pathname === '/about'}>About</NavLink>
                            <NavLink href="/blog" isActive={pathname?.startsWith('/blog')}>Blog</NavLink>
                            <NavLink href="/contact" isActive={pathname === '/contact'}>Contact</NavLink>
                            <NavLink href="https://app.fresho.com/wilsons-seafoods">Wholesale</NavLink>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            className="text-slate-200 hover:text-brand-gold transition-colors"
                        >
                            {isMenuOpen ? (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>

                        {/* Compact Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-44 bg-slate-900/98 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 overflow-hidden z-50">
                                <nav className="py-1">
                                    <Link
                                        href="/"
                                        onClick={closeMenu}
                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname === '/'
                                            ? 'bg-brand-gold/20 text-brand-gold'
                                            : 'text-slate-200 hover:bg-white/5 hover:text-brand-gold'
                                            }`}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/products"
                                        onClick={closeMenu}
                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname === '/products'
                                            ? 'bg-brand-gold/20 text-brand-gold'
                                            : 'text-slate-200 hover:bg-white/5 hover:text-brand-gold'
                                            }`}
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        href="/about"
                                        onClick={closeMenu}
                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname === '/about'
                                            ? 'bg-brand-gold/20 text-brand-gold'
                                            : 'text-slate-200 hover:bg-white/5 hover:text-brand-gold'
                                            }`}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="/blog"
                                        onClick={closeMenu}
                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname?.startsWith('/blog')
                                            ? 'bg-brand-gold/20 text-brand-gold'
                                            : 'text-slate-200 hover:bg-white/5 hover:text-brand-gold'
                                            }`}
                                    >
                                        Blog
                                    </Link>
                                    <Link
                                        href="/contact"
                                        onClick={closeMenu}
                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname === '/contact'
                                            ? 'bg-brand-gold/20 text-brand-gold'
                                            : 'text-slate-200 hover:bg-white/5 hover:text-brand-gold'
                                            }`}
                                    >
                                        Contact
                                    </Link>
                                    <a
                                        href="https://app.fresho.com/wilsons-seafoods"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-brand-gold transition-colors"
                                    >
                                        Wholesale
                                    </a>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
