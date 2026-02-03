'use client';

import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { FishProduct } from '@/types';
import ProductList from '@/components/ProductList';
import CategoryFilter from '@/components/CategoryFilter';
import { SearchIcon } from '@/components/icons/SearchIcon';

interface ProductsPageClientProps {
    products: FishProduct[];
    categories: string[];
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ProductsPageClient: React.FC<ProductsPageClientProps> = ({
    products,
    categories,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Products');

    // Ensure "All Products" is the first category
    const categoriesWithAll = useMemo(() => {
        const cats = categories.includes('All Products')
            ? categories
            : ['All Products', ...categories];
        return cats;
    }, [categories]);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (activeCategory === 'All Products') {
            // Exclude products in "Out of Stock" category from "All Products"
            filtered = filtered.filter((product) => product.category !== 'Out of Stock');
        } else {
            // Show only products in the selected category
            filtered = filtered.filter((product) => product.category === activeCategory);
        }

        return filtered;
    }, [products, searchTerm, activeCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
            {/* Hero Section */}
            <motion.section
                className="relative pt-40 pb-16 md:pb-24 overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Page Title */}
                    <motion.h1
                        className="text-5xl md:text-6xl font-serif font-bold text-white mb-4"
                        variants={fadeInUp}
                    >
                        Our Products
                    </motion.h1>
                    <motion.p
                        className="text-xl text-slate-300 max-w-2xl"
                        variants={fadeInUp}
                    >
                        Browse our full selection of premium fresh Tasmanian seafood, locally sourced and sustainably caught.
                    </motion.p>
                </div>
            </motion.section>

            {/* Search & Filter Section */}
            <section className="container mx-auto px-6 pb-12">
                {/* Search Bar */}
                <motion.div
                    className="max-w-xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                        />
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <CategoryFilter
                        categories={categoriesWithAll}
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />
                </motion.div>

                {/* Results Count */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-slate-400">
                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        {searchTerm && ` for "${searchTerm}"`}
                        {activeCategory !== 'All Products' && ` in ${activeCategory}`}
                    </p>
                </motion.div>
            </section>

            {/* Products Grid */}
            <section className="container mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <ProductList products={filteredProducts} />
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 pb-20">
                <motion.div
                    className="glass-panel rounded-2xl p-8 md:p-12 text-center bg-gradient-to-br from-brand-blue/20 to-cyan-900/20 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        We have access to a wide variety of seafood. Contact us about special orders and wholesale inquiries.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-block bg-brand-blue hover:bg-brand-blue/80 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg shadow-brand-blue/30 transform hover:scale-105 transition-all duration-300"
                        >
                            Contact Us
                        </a>
                        <a
                            href="tel:0362726600"
                            className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                        >
                            Call (03) 6272 6600
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ProductsPageClient;
