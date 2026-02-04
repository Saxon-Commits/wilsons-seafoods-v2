'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FishProduct } from '@/types';
import { PencilIcon } from '@/components/icons/PencilIcon';
import QuickViewModal from '@/components/QuickViewModal';

interface ProductListProps {
    products: FishProduct[];
    isAdmin?: boolean;
    onDelete?: (productName: string) => void;
    onEdit?: (product: FishProduct) => void;
    onToggleVisibility?: (id: number) => void;
    onEnquire?: (product: FishProduct) => void;
}

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

const ProductCard: React.FC<{
    product: FishProduct;
    isAdmin?: boolean;
    onDelete?: (productName: string) => void;
    onEdit?: (product: FishProduct) => void;
    onToggleVisibility?: (id: number) => void;
    onQuickView: (product: FishProduct) => void;
}> = ({ product, isAdmin, onDelete, onEdit, onToggleVisibility, onQuickView }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 group relative flex flex-col text-left"
    >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="absolute top-2 left-2 z-20 flex flex-col items-start gap-1">
            {product.is_fresh && (
                <div className="bg-brand-blue text-white text-[10px] md:text-xs font-bold uppercase px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg">
                    Fresh Today
                </div>
            )}
            {product.on_order && (
                <div className="bg-amber-500 text-white text-[10px] md:text-xs font-bold uppercase px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg">
                    On Order
                </div>
            )}
            {product.out_of_stock && (
                <div className="bg-red-600 text-white text-[10px] md:text-xs font-bold uppercase px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg">
                    Out of Stock
                </div>
            )}
        </div>
        {!product.is_visible && (
            <div className="absolute top-2 right-12 md:right-14 z-20 bg-slate-600 text-white text-[10px] md:text-xs font-bold uppercase px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow">
                Hidden
            </div>
        )}
        {isAdmin && (
            <div className="absolute top-3 right-3 z-20 flex space-x-2">
                {onToggleVisibility && product.id && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleVisibility(product.id!); }}
                        className={`p-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm transition-colors ${product.is_visible !== false ? 'text-slate-400 hover:bg-slate-700 hover:text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                        aria-label={product.is_visible !== false ? "Hide product" : "Show product"}
                    >
                        {product.is_visible !== false ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                )}
                {onEdit && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                        className="p-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-400 hover:bg-sky-600 hover:text-white transition-colors"
                        aria-label={`Edit ${product.name}`}
                    >
                        <PencilIcon />
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(product.name); }}
                        className="p-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-400 hover:bg-red-600 hover:text-white transition-colors"
                        aria-label={`Delete ${product.name}`}
                    >
                        <XIcon />
                    </button>
                )}
            </div>
        )}
        <div className="overflow-hidden relative h-48 md:h-64">
            <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Quick View Overlay */}
            {!isAdmin && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                        onClick={() => onQuickView(product)}
                        className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/20"
                    >
                        Quick View
                    </button>
                </div>
            )}
        </div>
        <div className="p-3 md:p-6 flex flex-col flex-grow relative z-10">
            <h3 className="text-base md:text-2xl font-serif font-bold text-white mb-1 md:mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">{product.name}</h3>
            <div className="flex-grow" />
            <p className="text-xl md:text-3xl font-bold text-cyan-400 mt-2 md:mt-4">{product.price}</p>
        </div>
    </motion.div>
);

const ProductList: React.FC<ProductListProps> = ({ products, isAdmin = false, onDelete, onEdit, onToggleVisibility, onEnquire }) => {
    const [selectedProduct, setSelectedProduct] = useState<FishProduct | null>(null);

    return (
        <>
            {products.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
                >
                    <AnimatePresence>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id || product.name}
                                product={product}
                                isAdmin={isAdmin}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onToggleVisibility={onToggleVisibility}
                                onQuickView={setSelectedProduct}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-slate-400 text-xl">No products found.</p>
                </div>
            )}

            <QuickViewModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onEnquire={onEnquire || (() => { })}
            />
        </>
    );
};

export default ProductList;
