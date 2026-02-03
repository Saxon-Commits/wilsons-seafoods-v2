'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FishProduct, HomepageContent, OpeningHour, Review } from '@/types';
import ProductList from '@/components/ProductList';
import CategoryFilter from '@/components/CategoryFilter';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import AboutUs from '@/components/AboutUs';
import Hours from '@/components/Hours';
import ContactForm from '@/components/ContactForm';
import GatewaySection from '@/components/home/GatewaySection';
import ReviewsSection from '@/components/home/ReviewsSection';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

interface HomePageClientProps {
    products: FishProduct[];
    settings: any;
    content: HomepageContent;
    reviews: Review[];
    hours: OpeningHour[];
    categories: string[];
}

export default function HomePageClient({ products, settings, content, hours, categories, reviews }: HomePageClientProps) {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [contactMessage, setContactMessage] = useState('');
    const contactFormRef = useRef<HTMLElement>(null);

    const backgroundUrl = settings?.background_url || null;

    const handleDismissBanner = () => {
        setIsBannerVisible(false);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('bannerDismissed', 'true');
        }
    };

    const handleEnquire = (product: FishProduct) => {
        setContactMessage(`I'm interested in the ${product.name}. Is it available?`);
        if (contactFormRef.current) {
            contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filter by search term
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerTerm));
        }

        // Filter by category
        if (activeFilter !== 'All') {
            filtered = filtered.filter(p => p.category === activeFilter);
        }

        return filtered;
    }, [products, searchTerm, activeFilter]);

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,_#1d4ed8_0%,_#1e3a8a_30%,_#0f172a_100%)] text-slate-100 font-sans selection:bg-sky-500/30 relative">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none z-0"></div>
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none z-0"></div>

            {isBannerVisible && content.announcement_text && (
                <AnnouncementBanner
                    text={content.announcement_text}
                    onDismiss={handleDismissBanner}
                />
            )}

            {/* Hero Section */}
            <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-blue-900/60 z-10"></div>
                    {backgroundUrl && (
                        <div
                            className="w-full h-full bg-cover bg-center transform scale-105 animate-slow-zoom"
                            style={{ backgroundImage: `url(${backgroundUrl})` }}
                        ></div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-20 text-center px-4 max-w-5xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                        {content.hero_title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light tracking-wide max-w-3xl mx-auto drop-shadow-md">
                        {content.hero_subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#products"
                            className="bg-brand-blue hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand-blue/30 text-lg inline-block scroll-smooth"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Today's Catch
                        </a>
                        <a
                            href="#reviews"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 border border-white/30 hover:border-white/50 text-lg inline-block"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Reviews
                        </a>
                    </div>
                </motion.div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
                {/* Gateway Cards Section */}
                <GatewaySection content={content} />

                {/* Featured Products Section */}
                <section id="products" className="scroll-mt-24" aria-label="Featured seafood products">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Featured Products</h2>
                        <div className="h-1 w-24 bg-brand-blue mx-auto rounded-full mb-6"></div>

                        {/* View All Products Button */}
                        <a
                            href="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-blue/50 transform hover:scale-105"
                        >
                            View All Products
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </motion.div>

                    <ProductList products={products} onEnquire={handleEnquire} />
                </section>

                {/* About Us Section */}
                <motion.section
                    id="about"
                    className="scroll-mt-24"
                    aria-label="About Wilsons Seafoods"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <AboutUs text={content.about_text} image_url={content.about_image_url} />
                </motion.section>

                {/* Hours & Location */}
                <motion.section
                    className="grid md:grid-cols-2 gap-12 items-start"
                    aria-label="Store location and hours"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="space-y-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-serif font-bold text-white mb-6">Visit Our Store</h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Experience the finest selection of seafood in person. Our friendly staff are ready to help you choose the perfect catch for your next meal.
                            </p>
                            <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-300 mb-4">
                                <HomeIcon className="w-6 h-6 text-brand-blue" />
                                <span className="text-lg">5 Sussex St, Glenorchy TAS 7010</span>
                            </div>
                        </div>
                        <Hours hours={hours} />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="h-[400px] rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
                        <iframe
                            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=5%20Sussex%20St,%20Glenorchy%20TAS%207010&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Wilsons Seafoods Location"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </motion.div>
                </motion.section>

                {/* Reviews Section */}
                <ReviewsSection reviews={reviews} />

                {/* Contact Section */}
                <motion.section
                    className="max-w-3xl mx-auto"
                    aria-label="Contact form"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <ContactForm ref={contactFormRef} initialMessage={contactMessage} />
                </motion.section>
            </main>
        </div>
    );
}
