import React, { useState, useEffect, useRef } from 'react';
import { FishProduct } from '@/types';
import { createClient } from '@/lib/supabase';
import { updateProduct } from '@/app/admin/products/actions';

interface EditProductModalProps {
  product: FishProduct;
  onSave: (originalName: string, updatedProduct: FishProduct) => void;
  onClose: () => void;
  categories: string[];
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose, categories }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [is_fresh, setIsFresh] = useState(false);
  const [on_order, setOnOrder] = useState(false);
  const [out_of_stock, setOutOfStock] = useState(false);
  const [is_visible, setIsVisible] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState('Fresh Fish');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.image_url);
      setIsFresh(product.is_fresh || false);
      setOnOrder(product.on_order || false);
      setOutOfStock(product.out_of_stock || false);
      setIsVisible(product.is_visible !== false);
      setFeatured(product.featured || false);
      setCategory(product.category || 'Fresh Fish');
      setDescription(product.description || '');
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;
      const supabase = createClient();

      supabase.storage.from('images').upload(filePath, file).then(({ error }) => {
        if (error) {
          console.error('Error uploading image:', error);
          return;
        }
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setImageUrl(data.publicUrl);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const updates = {
      name,
      price,
      image_url,
      is_fresh,
      on_order,
      out_of_stock,
      is_visible,
      featured,
      category,
      description,
    };

    console.log('Updating product:', product.id, 'with:', updates);

    const result = await updateProduct(product.id!, updates);

    setSubmitting(false);

    if (result.success) {
      console.log('Update successful');
      onSave(product.name, { ...product, ...updates });
    } else {
      console.error('Update failed:', result.error);
      alert(result.error || 'Failed to update product');
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white font-serif">Edit Product</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="edit-product-name" className="block text-base font-medium text-slate-300 mb-2">Product Name</label>
            <input id="edit-product-name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg" required />
          </div>
          <div>
            <label htmlFor="edit-product-price" className="block text-base font-medium text-slate-300 mb-2">Product Price</label>
            <input id="edit-product-price" type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg" required />
          </div>
          <div>
            <label htmlFor="edit-product-category" className="block text-base font-medium text-slate-300 mb-2">Category</label>
            <select
              id="edit-product-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-white text-lg"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="edit-product-description" className="block text-base font-medium text-slate-300 mb-2">Description</label>
            <textarea
              id="edit-product-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg h-32"
              placeholder="Enter product description..."
            />
          </div>
          <div>
            <label htmlFor="edit-product-image" className="block text-base font-medium text-slate-300 mb-2">Product Image</label>
            <input
              id="edit-product-image"
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              className="w-full text-base text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-300 hover:file:bg-slate-600 transition-colors"
              accept="image/*"
            />
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="edit-is-fresh" checked={is_fresh} onChange={e => setIsFresh(e.target.checked)} className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-sky-500" />
            <label htmlFor="edit-is-fresh" className="text-base font-medium text-slate-300">Mark as "Fresh Today"</label>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="edit-on-order" checked={on_order} onChange={e => setOnOrder(e.target.checked)} className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500" />
            <label htmlFor="edit-on-order" className="text-base font-medium text-slate-300">Mark as "On Order"</label>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="edit-out-of-stock" checked={out_of_stock} onChange={e => setOutOfStock(e.target.checked)} className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-red-500 focus:ring-red-500" />
            <label htmlFor="edit-out-of-stock" className="text-base font-medium text-slate-300">Mark as "Out of Stock"</label>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="edit-is-visible" checked={is_visible} onChange={e => setIsVisible(e.target.checked)} className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-sky-500" />
            <label htmlFor="edit-is-visible" className="text-base font-medium text-slate-300">Show on public site</label>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="edit-featured" checked={featured} onChange={e => setFeatured(e.target.checked)} className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500" />
            <label htmlFor="edit-featured" className="text-base font-medium text-slate-300">⭐ Feature on homepage</label>
          </div>
          {image_url && <img src={image_url} alt="Preview" className="mt-2 rounded-md max-h-40 object-contain mx-auto bg-slate-700" />}
          <div className="pt-4 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors font-semibold text-lg">Cancel</button>
            <button type="submit" disabled={submitting} className="bg-brand-blue hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default EditProductModal;