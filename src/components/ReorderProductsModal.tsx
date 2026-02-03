import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { FishProduct } from '@/types';

interface ReorderProductsModalProps {
    products: FishProduct[];
    isOpen: boolean;
    onClose: () => void;
    onSave: (newOrder: FishProduct[]) => void;
}

const ReorderProductsModal: React.FC<ReorderProductsModalProps> = ({ products, isOpen, onClose, onSave }) => {
    const [items, setItems] = useState(products);

    useEffect(() => {
        setItems(products);
    }, [products]);

    const moveToTop = (index: number) => {
        const newItems = [...items];
        const [movedItem] = newItems.splice(index, 1);
        newItems.unshift(movedItem);
        setItems(newItems);
    };

    const moveToBottom = (index: number) => {
        const newItems = [...items];
        const [movedItem] = newItems.splice(index, 1);
        newItems.push(movedItem);
        setItems(newItems);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl border border-slate-700 flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-serif">Reorder Products</h2>
                        <p className="text-slate-400 text-sm mt-1">Drag and drop items to change their order on the public site.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
                        {items.map((item, index) => (
                            <Reorder.Item key={item.id} value={item} className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex items-center gap-4 cursor-move active:cursor-grabbing hover:border-slate-500 transition-colors shadow-sm select-none">
                                <div className="text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="8" y1="6" x2="21" y2="6"></line>
                                        <line x1="8" y1="12" x2="21" y2="12"></line>
                                        <line x1="8" y1="18" x2="21" y2="18"></line>
                                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                    </svg>
                                </div>
                                <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded object-cover bg-slate-700" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white truncate">{item.name}</h3>
                                    <p className="text-sm text-slate-400 truncate">{item.category} • {item.price}</p>
                                </div>
                                {!item.is_visible && (
                                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">Hidden</span>
                                )}
                                <div className="flex flex-col gap-1 ml-2">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); moveToTop(index); }}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Move to Top"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="19" x2="12" y2="5"></line>
                                            <polyline points="5 12 12 5 19 12"></polyline>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); moveToBottom(index); }}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Move to Bottom"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <polyline points="19 12 12 19 5 12"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-slate-900 rounded-b-xl">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 font-medium transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(items)}
                        className="px-6 py-2.5 bg-brand-blue hover:bg-sky-500 text-white rounded-lg font-bold shadow-lg shadow-brand-blue/20 transition-all active:scale-95"
                    >
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReorderProductsModal;
