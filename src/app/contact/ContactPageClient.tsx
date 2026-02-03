'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Hours from '@/components/Hours';
import { OpeningHour } from '@/types';

interface ContactPageClientProps {
    phoneNumber: string;
    hours: OpeningHour[];
}

const ContactPageClient: React.FC<ContactPageClientProps> = ({
    phoneNumber,
    hours,
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
                            Get In Touch
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            We'd love to hear from you. Visit us, call us, or send us a message.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 pb-20">
                {/* Contact Info & Form Grid */}
                <section className="grid lg:grid-cols-3 gap-12 mb-16">
                    {/* Contact Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Store Location */}
                        <div className="glass-panel rounded-xl p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Visit Our Store
                            </h2>
                            <p className="text-slate-300 text-lg mb-2">5 Sussex St</p>
                            <p className="text-slate-300 text-lg mb-4">Glenorchy TAS 7010</p>
                            <a
                                href="https://maps.google.com/?q=5+Sussex+St,+Glenorchy+TAS+7010"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-brand-blue hover:text-brand-blue/80 font-medium transition-colors"
                            >
                                Get Directions →
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="glass-panel rounded-xl p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Us
                            </h2>
                            <a
                                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                                className="text-slate-300 text-xl hover:text-brand-blue transition-colors font-medium"
                            >
                                {phoneNumber}
                            </a>
                        </div>

                        {/* Opening Hours */}
                        <div className="glass-panel rounded-xl p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Opening Hours
                            </h2>
                            <Hours hours={hours} />
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="glass-panel rounded-xl p-8 bg-slate-800/50 backdrop-blur-sm border border-white/10">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                                Send Us A Message
                            </h2>
                            <p className="text-slate-400 mb-8">
                                Have a question or special request? Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                            <ContactForm />
                        </div>
                    </motion.div>
                </section>

                {/* Map Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 text-center">
                        Find Us on the Map
                    </h2>
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 h-[500px]">
                        <iframe
                            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=5%20Sussex%20St,%20Glenorchy%20TAS%207010&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Wilson's Seafoods Location"
                            className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </motion.section>

                {/* Wholesale Inquiry Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel rounded-2xl p-8 md:p-12 bg-gradient-to-br from-brand-blue/30 to-cyan-900/30 backdrop-blur-sm border border-white/10"
                >
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            Wholesale & Trade Accounts
                        </h2>
                        <p className="text-slate-300 text-lg mb-6">
                            Are you a restaurant, chef, or seafood retailer? We offer competitive wholesale pricing and reliable deliveries for trade accounts.
                        </p>
                        <p className="text-slate-300 text-lg mb-8">
                            For wholesale inquiries and to set up a trade account, please call us directly at <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-brand-blue hover:text-brand-blue/80 font-bold transition-colors">{phoneNumber}</a> or visit our wholesale portal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                                className="inline-block bg-brand-blue hover:bg-brand-blue/80 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg shadow-brand-blue/30 transform hover:scale-105 transition-all duration-300"
                            >
                                Call for Wholesale
                            </a>
                            <a
                                href="https://www.fresho.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                            >
                                Wholesale Portal →
                            </a>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ContactPageClient;
