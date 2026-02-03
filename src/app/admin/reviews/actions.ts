'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';

export async function deleteReview(reviewId: number) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', reviewId);

        if (error) throw error;

        revalidatePath('/admin/reviews');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error deleting review:', error);
        return { success: false, error: 'Failed to delete review' };
    }
}
