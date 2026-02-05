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

        if (!imageFile) {
            console.error('No image file provided');
            return { success: false, error: 'No image file provided' };
        }

        console.log(`Uploading image for field: ${field}, file name: ${imageFile.name}, size: ${imageFile.size}`);

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        console.log(`Uploading to path: ${filePath}`);

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, imageFile);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            throw uploadError;
        }

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
        console.log(`Image uploaded successfully, public URL: ${urlData.publicUrl}`);

        const { error: updateError } = await supabase
            .from('homepage_content')
            .update({ [field]: urlData.publicUrl })
            .eq('id', 1);

        if (updateError) {
            console.error('Database update error:', updateError);
            throw updateError;
        }

        console.log(`Database updated successfully for field: ${field}`);

        revalidatePath('/admin/homepage');
        revalidatePath('/');

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to upload image' };
    }
}
