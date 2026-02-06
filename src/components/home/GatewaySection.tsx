'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { HomepageContent } from '@/types';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const GatewayCard: React.FC<{
    imageUrl: string;
    headline: string;
    description: string;
    buttonText: string;
    buttonHref: string;
}> = ({ imageUrl, headline, description, buttonText, buttonHref }) => {
    const isExternal = buttonHref.startsWith('http');

    return (
        <motion.div
            variants={fadeInUp}
            className="glass-panel rounded-xl overflow-hidden group transform transition-all duration-300 hover:shadow-2xl hover:shadow-brand-blue/20 hover:-translate-y-2 flex flex-col h-full border border-white/10 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm"
        >
            <div className="relative overflow-hidden h-64 flex-shrink-0">
                <Image src={imageUrl} alt={headline} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>

            <div className="p-8 flex flex-col flex-grow text-center relative">
                <div className="w-12 h-1 bg-brand-gold mx-auto mb-6 rounded-full opacity-80"></div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4 group-hover:text-brand-blue transition-colors">{headline}</h3>
                <p className="text-slate-300 mb-8 flex-grow leading-relaxed text-lg font-light">{description}</p>

                <div className="mt-auto">
                    <a
                        href={buttonHref}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="inline-block bg-brand-blue hover:bg-brand-blue/80 text-white font-bold text-lg px-10 py-3.5 rounded-full shadow-lg shadow-brand-blue/30 transform hover:scale-105 transition-all duration-300 border-t border-white/20"
                    >
                        {buttonText}
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const GatewaySection: React.FC<{
    content: HomepageContent;
}> = ({ content }) => {
    return (
        <motion.section
            aria-label="Service options"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto px-4"
        >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <GatewayCard
                    imageUrl={content.gateway1_image_url || "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop"}
                    headline={content.gateway1_title || "Shop Our Public Store"}
                    description={content.gateway1_description || "Get the freshest Tasmanian seafood and pickup in store today. Browse our public store."}
                    buttonText={content.gateway1_button_text || "Available in Store"}
                    buttonHref={content.gateway1_button_url || "/products"}
                />
                <GatewayCard
                    imageUrl={content.gateway2_image_url || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop"}
                    headline={content.gateway2_title || "Wholesale & Chef's Portal"}
                    description={content.gateway2_description || "For our restaurant, chef, and wholesale partners. Log in to your Fresho account or apply for a new trade account here."}
                    buttonText={content.gateway2_button_text || "Enter Portal"}
                    buttonHref={content.gateway2_button_url || "https://www.fresho.com/"}
                />
            </div>
        </motion.section>
    );
};

export default GatewaySection;
