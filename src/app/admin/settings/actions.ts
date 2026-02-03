'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import { OpeningHour, SocialLinks } from '@/types';

export async function uploadImage(formData: FormData, field: 'logo_url' | 'background_url') {
    const supabase = await createClient();

    try {
        const imageFile = formData.get('image') as File;

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from('site_settings')
            .update({ [field]: urlData.publicUrl })
            .eq('id', 1);

        if (updateError) throw updateError;

        revalidatePath('/admin/settings');
        revalidatePath('/');

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: 'Failed to upload image' };
    }
}

export async function updateCategories(categories: string[]) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('site_settings')
            .update({ categories })
            .eq('id', 1);

        if (error) throw error;

        revalidatePath('/admin/settings');
        revalidatePath('/admin/products');
        revalidatePath('/products');

        return { success: true };
    } catch (error) {
        console.error('Error updating categories:', error);
        return { success: false, error: 'Failed to update categories' };
    }
}

export async function updateSocialLinks(socialLinks: SocialLinks) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('site_settings')
            .update({ social_links: socialLinks })
            .eq('id', 1);

        if (error) throw error;

        revalidatePath('/admin/settings');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error updating social links:', error);
        return { success: false, error: 'Failed to update social links' };
    }
}

export async function updateContactInfo(abn: string, phoneNumber: string) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('site_settings')
            .update({ abn, phone_number: phoneNumber })
            .eq('id', 1);

        if (error) throw error;

        revalidatePath('/admin/settings');
        revalidatePath('/contact');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error updating contact info:', error);
        return { success: false, error: 'Failed to update contact info' };
    }
}

export async function updateOpeningHours(hours: OpeningHour[]) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('site_settings')
            .update({ opening_hours: hours })
            .eq('id', 1);

        if (error) throw error;

        revalidatePath('/admin/settings');
        revalidatePath('/contact');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error updating opening hours:', error);
        return { success: false, error: 'Failed to update opening hours' };
    }
}
