import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
}) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={twMerge(
                            clsx(
                                'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                                'border border-transparent',
                                isActive
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border-slate-700'
                            )
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-brand-blue rounded-full"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{category}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryFilter;
