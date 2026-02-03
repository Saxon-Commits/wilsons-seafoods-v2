'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';

export async function updateHomepageContent(field: string, value: string) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('homepage_content')
            .update({ [field]: value })
            .eq('id', 1);

        if (error) throw error;

        revalidatePath('/admin/homepage');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error updating homepage content:', error);
        return { success: false, error: 'Failed to update content' };
    }
}

export async function uploadHomepageImage(formData: FormData, field: string) {
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
            .from('homepage_content')
            .update({ [field]: urlData.publicUrl })
            .eq('id', 1);

        if (updateError) throw updateError;

        revalidatePath('/admin/homepage');
        revalidatePath('/');

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: 'Failed to upload image' };
    }
}
