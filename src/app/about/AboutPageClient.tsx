'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AboutPageClientProps {
    aboutText: string;
    aboutImageUrl: string;
}

const AboutPageClient: React.FC<AboutPageClientProps> = ({
    aboutText,
    aboutImageUrl,
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
            {/* Hero Section */}
            <section className="relative pt-40 pb-16 md:pb-24 overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Page Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
                            About Wilson's Seafoods
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            Your trusted source for premium fresh Tasmanian seafood since 1974
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 md:order-1"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                            Our Story
                        </h2>
                        <div className="text-slate-300 text-lg leading-relaxed space-y-4">
                            <p>{aboutText}</p>
                            <p>
                                We pride ourselves on offering only the freshest catch, sourced daily from local Tasmanian waters and trusted suppliers. Our commitment to quality and sustainability has made us a favorite among both households and restaurants across Tasmania.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 md:order-2 relative w-full aspect-[4/3]"
                    >
                        <Image
                            src={aboutImageUrl}
                            alt="Wilson's Seafoods"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-xl shadow-2xl object-cover border border-white/10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Mission & Values Section */}
            <section className="container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Our Mission & Values
                    </h2>
                    <div className="h-1 w-24 bg-brand-blue mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel rounded-xl p-8 bg-gradient-to-br from-brand-blue/20 to-cyan-900/20 backdrop-blur-sm border border-white/10"
                    >
                        <div className="text-brand-blue text-5xl mb-4">🐟</div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">
                            Quality First
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            We hand-select every product to ensure only the freshest, highest-quality seafood reaches your table. No compromises.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-panel rounded-xl p-8 bg-gradient-to-br from-brand-blue/20 to-cyan-900/20 backdrop-blur-sm border border-white/10"
                    >
                        <div className="text-brand-blue text-5xl mb-4">🌊</div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">
                            Sustainability
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            We're committed to sustainable fishing practices that protect Tasmania's marine ecosystems for future generations.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="glass-panel rounded-xl p-8 bg-gradient-to-br from-brand-blue/20 to-cyan-900/20 backdrop-blur-sm border border-white/10"
                    >
                        <div className="text-brand-blue text-5xl mb-4">🤝</div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">
                            Local Community
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            As a family-owned business, we're proud to support local fishermen and serve the Glenorchy community.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What We Offer Section */}
            <section className="container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 text-center">
                        What Sets Us Apart
                    </h2>

                    <div className="space-y-6">
                        <div className="glass-panel rounded-lg p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-3">Daily Fresh Deliveries</h3>
                            <p className="text-slate-300 text-lg">
                                Our seafood arrives fresh daily, straight from the boats and trusted suppliers. When you shop at Wilson's, you're getting today's catch, not yesterday's.
                            </p>
                        </div>

                        <div className="glass-panel rounded-lg p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-3">Expert Knowledge</h3>
                            <p className="text-slate-300 text-lg">
                                Our experienced team knows seafood inside and out. We're always happy to help you select the perfect product and share our favorite cooking tips and recipes.
                            </p>
                        </div>

                        <div className="glass-panel rounded-lg p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-3">Wholesale & Retail</h3>
                            <p className="text-slate-300 text-lg">
                                Whether you're cooking for your family or running a restaurant, we've got you covered. Browse our retail selection or access our wholesale portal for restaurant and chef accounts.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-16 pb-20">
                <motion.div
                    className="glass-panel rounded-2xl p-8 md:p-12 text-center bg-gradient-to-br from-brand-blue/30 to-cyan-900/30 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Ready to Experience the Difference?
                    </h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        Visit our store in Glenorchy or browse our full selection of premium Tasmanian seafood online.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products"
                            className="inline-block bg-brand-blue hover:bg-brand-blue/80 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg shadow-brand-blue/30 transform hover:scale-105 transition-all duration-300"
                        >
                            View Our Products
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPageClient;
