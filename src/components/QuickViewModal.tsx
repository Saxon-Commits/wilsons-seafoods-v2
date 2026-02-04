import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FishProduct } from '@/types';


// Reusing SVG if lucide-react isn't installed, but let's assume I should use the one from ProductList or define it here.
// To be safe and self-contained, I'll define the CloseIcon here.

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

interface QuickViewModalProps {
    product: FishProduct | null;
    isOpen: boolean;
    onClose: () => void;
    onEnquire: (product: FishProduct) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onEnquire }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700 pointer-events-auto flex flex-col md:flex-row"
                        >
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                                    {product.is_fresh && (
                                        <div className="bg-brand-blue text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                                            Fresh Today
                                        </div>
                                    )}
                                    {product.on_order && (
                                        <div className="bg-amber-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                                            On Order
                                        </div>
                                    )}
                                    {product.out_of_stock && (
                                        <div className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                                            Out of Stock
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-8 flex flex-col relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
                                >
                                    <CloseIcon />
                                </button>

                                <div className="mb-6">
                                    <h2 className="text-3xl font-serif font-bold text-white mb-2">{product.name}</h2>
                                    <p className="text-brand-blue font-medium text-lg">{product.category || 'Fresh Seafood'}</p>
                                </div>

                                <div className="prose prose-invert mb-8 overflow-y-auto max-h-48">
                                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {product.description || `Our ${product.name} is sourced daily to ensure the highest quality and freshness. Perfect for grilling, baking, or enjoying raw (sashimi grade available upon request).`}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Price</p>
                                        <p className="text-3xl font-bold text-white">{product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            onEnquire(product);
                                            onClose();
                                        }}
                                        className="bg-brand-blue hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-brand-blue/20"
                                    >
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
