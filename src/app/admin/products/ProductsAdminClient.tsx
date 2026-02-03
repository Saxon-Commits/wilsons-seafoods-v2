'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductList from '@/components/ProductList';
import EditProductModal from '@/components/EditProductModal';
import ReorderProductsModal from '@/components/ReorderProductsModal';
import { FishProduct } from '@/types';
import { addProduct, deleteProduct, toggleVisibility, updateProductOrder } from './actions';

interface ProductsAdminClientProps {
    products: FishProduct[];
    categories: string[];
}

const ProductsAdminClient: React.FC<ProductsAdminClientProps> = ({
    products: initialProducts,
    categories,
}) => {
    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    const [editingProduct, setEditingProduct] = useState<FishProduct | null>(null);
    const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);

    // Sync local state when server data refreshes
    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    // Add product form state
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductCategory, setNewProductCategory] = useState(categories[0] || 'Fresh Fish');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [isNewProductFresh, setIsNewProductFresh] = useState(false);
    const [isNewProductOnOrder, setIsNewProductOnOrder] = useState(false);
    const [isNewProductOutOfStock, setIsNewProductOutOfStock] = useState(false);
    const [isNewProductVisible, setIsNewProductVisible] = useState(true);
    const [isNewProductFeatured, setIsNewProductFeatured] = useState(false);
    const [newProductImageFile, setNewProductImageFile] = useState<File | null>(null);
    const [newProductImageUrl, setNewProductImageUrl] = useState('');
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewProductImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProductImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProductName || !newProductPrice || !newProductImageFile) {
            alert('Please fill all fields and select an image.');
            return;
        }

        setSubmitting(true);

        const formData = new FormData();
        formData.append('name', newProductName);
        formData.append('price', newProductPrice);
        formData.append('category', newProductCategory);
        formData.append('description', newProductDescription);
        formData.append('is_fresh', String(isNewProductFresh));
        formData.append('on_order', String(isNewProductOnOrder));
        formData.append('out_of_stock', String(isNewProductOutOfStock));
        formData.append('is_visible', String(isNewProductVisible));
        formData.append('featured', String(isNewProductFeatured));
        formData.append('image', newProductImageFile);

        const result = await addProduct(formData);

        if (result.success) {
            // Reset form
            setNewProductName('');
            setNewProductPrice('');
            setNewProductCategory(categories[0] || 'Fresh Fish');
            setNewProductDescription('');
            setIsNewProductFresh(false);
            setIsNewProductOnOrder(false);
            setIsNewProductOutOfStock(false);
            setIsNewProductVisible(true);
            setIsNewProductFeatured(false);
            setNewProductImageFile(null);
            setNewProductImageUrl('');
            if (imageInputRef.current) {
                imageInputRef.current.value = '';
            }
            router.refresh();
        } else {
            alert(result.error || 'Failed to add product');
        }

        setSubmitting(false);
    };

    const handleDelete = async (productName: string) => {
        const product = products.find((p) => p.name === productName);
        if (!product || !product.id) return;

        if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) return;

        const result = await deleteProduct(product.id);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to delete product');
        }
    };

    const handleToggleVisibility = async (id: number) => {
        const result = await toggleVisibility(id);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to toggle visibility');
        }
    };

    const handleReorderSave = async (newOrder: FishProduct[]) => {
        const result = await updateProductOrder(newOrder);

        if (result.success) {
            setIsReorderModalOpen(false);
            router.refresh();
        } else {
            alert(result.error || 'Failed to save order');
        }
    };

    const handleEdit = (product: FishProduct) => {
        setEditingProduct(product);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1 bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700 lg:sticky lg:top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold font-serif">Add New Product</h2>
                    <button
                        onClick={() => setIsReorderModalOpen(true)}
                        className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded transition-colors flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        Reorder
                    </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-5">
                    <div>
                        <label htmlFor="new-product-name" className="block text-base font-medium text-slate-300 mb-2">
                            Product Name
                        </label>
                        <input
                            id="new-product-name"
                            type="text"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="new-product-price" className="block text-base font-medium text-slate-300 mb-2">
                            Product Price
                        </label>
                        <input
                            id="new-product-price"
                            type="text"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="new-product-category" className="block text-base font-medium text-slate-300 mb-2">
                            Category
                        </label>
                        <select
                            id="new-product-category"
                            value={newProductCategory}
                            onChange={(e) => setNewProductCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="new-product-description" className="block text-base font-medium text-slate-300 mb-2">
                            Description
                        </label>
                        <textarea
                            id="new-product-description"
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg h-32"
                            placeholder="Enter product description..."
                        />
                    </div>

                    <div>
                        <label htmlFor="new-product-image" className="block text-base font-medium text-slate-300 mb-2">
                            Product Image
                        </label>
                        <input
                            id="new-product-image"
                            type="file"
                            ref={imageInputRef}
                            onChange={handleImageChange}
                            className="w-full text-base text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-300 hover:file:bg-slate-600 transition-colors"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="is-fresh"
                            checked={isNewProductFresh}
                            onChange={(e) => setIsNewProductFresh(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-brand-blue focus:ring-brand-blue"
                        />
                        <label htmlFor="is-fresh" className="text-base font-medium text-slate-300">
                            Mark as "Fresh Today"
                        </label>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="is-on-order"
                            checked={isNewProductOnOrder}
                            onChange={(e) => setIsNewProductOnOrder(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                        />
                        <label htmlFor="is-on-order" className="text-base font-medium text-slate-300">
                            Mark as "On Order"
                        </label>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="is-out-of-stock"
                            checked={isNewProductOutOfStock}
                            onChange={(e) => setIsNewProductOutOfStock(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-red-500 focus:ring-red-500"
                        />
                        <label htmlFor="is-out-of-stock" className="text-base font-medium text-slate-300">
                            Mark as "Out of Stock"
                        </label>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="is-visible"
                            checked={isNewProductVisible}
                            onChange={(e) => setIsNewProductVisible(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-brand-blue focus:ring-brand-blue"
                        />
                        <label htmlFor="is-visible" className="text-base font-medium text-slate-300">
                            Show on public site
                        </label>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="is-featured"
                            checked={isNewProductFeatured}
                            onChange={(e) => setIsNewProductFeatured(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500"
                        />
                        <label htmlFor="is-featured" className="text-base font-medium text-slate-300">
                            ⭐ Feature on homepage
                        </label>
                    </div>

                    {newProductImageUrl && (
                        <img
                            src={newProductImageUrl}
                            alt="Preview"
                            className="mt-2 rounded-md max-h-32 object-contain mx-auto bg-slate-700 p-2"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-brand-blue hover:bg-brand-blue/80 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>

            {/* Manage Products */}
            <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Manage Products</h2>
                <div className="overflow-y-auto pr-2">
                    <ProductList
                        products={initialProducts}
                        isAdmin={true}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onToggleVisibility={handleToggleVisibility}
                    />
                </div>
            </div>

            {/* Modals */}
            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onSave={async (originalName, updatedProduct) => {
                        // Close modal first to show loading state
                        setEditingProduct(null);
                        // Refresh to get updated data from database
                        router.refresh();
                    }}
                    onClose={() => setEditingProduct(null)}
                    categories={categories}
                />
            )}

            {isReorderModalOpen && (
                <ReorderProductsModal
                    products={initialProducts}
                    isOpen={isReorderModalOpen}
                    onClose={() => setIsReorderModalOpen(false)}
                    onSave={handleReorderSave}
                />
            )}
        </div>
    );
};

export default ProductsAdminClient;
