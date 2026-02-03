'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import { FishProduct } from '@/types';

export async function addProduct(formData: FormData) {
    const supabase = await createClient();

    try {
        const name = formData.get('name') as string;
        const price = formData.get('price') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const is_fresh = formData.get('is_fresh') === 'true';
        const on_order = formData.get('on_order') === 'true';
        const out_of_stock = formData.get('out_of_stock') === 'true';
        const is_visible = formData.get('is_visible') === 'true';
        const featured = formData.get('featured') === 'true';
        const imageFile = formData.get('image') as File;

        // Upload image to Supabase Storage
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, imageFile);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return { success: false, error: 'Failed to upload image' };
        }

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);

        // Insert product
        const { error: insertError } = await supabase.from('products').insert([
            {
                name,
                price,
                image_url: urlData.publicUrl,
                category,
                description,
                is_fresh,
                on_order,
                out_of_stock,
                is_visible,
                featured,
            },
        ]);

        if (insertError) {
            console.error('Insert error:', insertError);
            return { success: false, error: 'Failed to add product' };
        }

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function deleteProduct(productId: number) {
    const supabase = await createClient();

    try {
        const { error } = await supabase.from('products').delete().eq('id', productId);

        if (error) throw error;

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: 'Failed to delete product' };
    }
}

export async function updateProduct(productId: number, updates: Partial<FishProduct>) {
    const supabase = await createClient();

    try {
        console.log('[SERVER] Updating product ID:', productId, 'with:', updates);

        // First, get current product state
        const { data: beforeUpdate } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        console.log('[SERVER] Product BEFORE update:', beforeUpdate);

        const { error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', productId);

        if (error) {
            console.error('[SERVER] Update error:', error);
            throw error;
        }

        // Verify the update
        const { data: afterUpdate } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        console.log('[SERVER] Product AFTER update:', afterUpdate);
        console.log('[SERVER] Category changed from', beforeUpdate?.category, 'to', afterUpdate?.category);

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('[SERVER] Error updating product:', error);
        return { success: false, error: 'Failed to update product' };
    }
}

export async function toggleVisibility(productId: number) {
    const supabase = await createClient();

    try {
        // Get current visibility
        const { data: product } = await supabase
            .from('products')
            .select('is_visible')
            .eq('id', productId)
            .single();

        if (!product) throw new Error('Product not found');

        // Toggle visibility
        const { error } = await supabase
            .from('products')
            .update({ is_visible: !product.is_visible })
            .eq('id', productId);

        if (error) throw error;

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error toggling visibility:', error);
        return { success: false, error: 'Failed to toggle visibility' };
    }
}

export async function updateProductOrder(products: FishProduct[]) {
    const supabase = await createClient();

    try {
        await Promise.all(
            products.map((product, index) =>
                supabase.from('products').update({ sort_order: index }).eq('id', product.id)
            )
        );

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error updating product order:', error);
        return { success: false, error: 'Failed to update order' };
    }
}
