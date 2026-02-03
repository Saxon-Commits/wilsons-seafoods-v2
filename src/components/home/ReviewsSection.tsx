'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/types';

interface ReviewsSectionProps {
    reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
    return (
        <section id="reviews" className="py-20 scroll-mt-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it - hear from our happy customers!
                    </p>
                </motion.div>

                {/* Reviews Grid - Only show if there are reviews */}
                {reviews.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-brand-blue transition-all duration-300 shadow-lg"
                            >
                                {/* Star Rating */}
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-slate-600'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-slate-300 mb-4 leading-relaxed">
                                    "{review.review_text}"
                                </p>

                                {/* Customer Name */}
                                <div className="flex items-center justify-between">
                                    <p className="text-white font-semibold">{review.customer_name}</p>
                                    {review.created_at && (
                                        <p className="text-slate-500 text-sm">
                                            {new Date(review.created_at).toLocaleDateString('en-AU', {
                                                year: 'numeric',
                                                month: 'short',
                                            })}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Google Reviews CTA - ALWAYS SHOW */}
                <div className="text-center">
                    <a
                        href="https://g.page/r/CbPnN3OdFY6pEAI/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold py-4 px-8 rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Leave a Google Review
                    </a>
                    <p className="text-slate-400 text-sm mt-3">
                        Share your experience with Wilson's Seafoods
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
