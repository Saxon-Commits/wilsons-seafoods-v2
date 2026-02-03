'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function createBlogPost(formData: FormData) {
    const supabase = await createClient();

    try {
        const { error } = await supabase.from('blog_posts').insert({
            title: formData.get('title'),
            slug: formData.get('slug'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            author: formData.get('author') || "Wilson's Seafoods Team",
            category: formData.get('category'),
            featured_image_url: formData.get('featured_image_url'),
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
        const updateData: any = {
            title: formData.get('title'),
            slug: formData.get('slug'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            author: formData.get('author') || "Wilson's Seafoods Team",
            category: formData.get('category'),
            featured_image_url: formData.get('featured_image_url'),
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
