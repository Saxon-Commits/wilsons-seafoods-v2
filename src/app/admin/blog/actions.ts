'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';

export async function uploadBlogImage(formData: FormData) {
    const supabase = await createClient();

    try {
        const imageFile = formData.get('image') as File;

        if (!imageFile || imageFile.size === 0) {
            return { success: false, error: 'No image provided' };
        }

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, imageFile);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return { success: false, error: 'Failed to upload image' };
        }

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function createBlogPost(formData: FormData) {
    const supabase = await createClient();

    try {
        console.log('[createBlogPost] Starting new post creation');
        let featuredImageUrl = formData.get('featured_image_url') as string;

        // Handle image file upload if provided
        const imageFile = formData.get('featured_image') as File;
        console.log('[createBlogPost] Image file present:', !!imageFile, 'Size:', imageFile?.size);

        if (imageFile && imageFile.size > 0) {
            console.log('[createBlogPost] Starting image upload...');
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `public/${fileName}`;

            console.log('[createBlogPost] Uploading to path:', filePath);

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('images')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error('[createBlogPost] Upload error:', uploadError);
                return { success: false, error: `Failed to upload image: ${uploadError.message}` };
            }

            console.log('[createBlogPost] Upload successful:', uploadData);
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
            featuredImageUrl = urlData.publicUrl;
            console.log('[createBlogPost] Generated public URL:', featuredImageUrl);
        }

        const { error } = await supabase.from('blog_posts').insert({
            title: formData.get('title'),
            slug: formData.get('slug'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            author: formData.get('author') || "Wilson's Seafoods Team",
            category: formData.get('category'),
            featured_image_url: featuredImageUrl,
            meta_description: formData.get('meta_description'),
            published: formData.get('published') === 'true',
            published_at: formData.get('published') === 'true' ? new Date().toISOString() : null,
        });

        if (error) throw error;

        revalidatePath('/blog');
        revalidatePath('/admin/blog');

        return { success: true };
    } catch (error) {
        console.error('Error creating blog post:', error);
        return { success: false, error: 'Failed to create blog post' };
    }
}

export async function updateBlogPost(id: number, formData: FormData) {
    const supabase = await createClient();

    try {
        console.log('[updateBlogPost] Starting update for post ID:', id);
        let featuredImageUrl = formData.get('featured_image_url') as string;

        // Handle image file upload if provided
        const imageFile = formData.get('featured_image') as File;
        console.log('[updateBlogPost] Image file present:', !!imageFile, 'Size:', imageFile?.size);

        if (imageFile && imageFile.size > 0) {
            console.log('[updateBlogPost] Starting image upload...');
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `public/${fileName}`;

            console.log('[updateBlogPost] Uploading to path:', filePath);

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('images')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error('[updateBlogPost] Upload error:', uploadError);
                return { success: false, error: `Failed to upload image: ${uploadError.message}` };
            }

            console.log('[updateBlogPost] Upload successful:', uploadData);
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
            featuredImageUrl = urlData.publicUrl;
            console.log('[updateBlogPost] Generated public URL:', featuredImageUrl);
        }

        const updateData: any = {
            title: formData.get('title'),
            slug: formData.get('slug'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            author: formData.get('author') || "Wilson's Seafoods Team",
            category: formData.get('category'),
            featured_image_url: featuredImageUrl,
            meta_description: formData.get('meta_description'),
            published: formData.get('published') === 'true',
            updated_at: new Date().toISOString(),
        };

        // Only update published_at if changing to published
        if (formData.get('published') === 'true') {
            updateData.published_at = new Date().toISOString();
        }

        const { error } = await supabase
            .from('blog_posts')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/blog');
        revalidatePath(`/blog/${formData.get('slug')}`);
        revalidatePath('/admin/blog');

        return { success: true };
    } catch (error) {
        console.error('Error updating blog post:', error);
        return { success: false, error: 'Failed to update blog post' };
    }
}

export async function deleteBlogPost(id: number) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/blog');
        revalidatePath('/admin/blog');

        return { success: true };
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return { success: false, error: 'Failed to delete blog post' };
    }
}
