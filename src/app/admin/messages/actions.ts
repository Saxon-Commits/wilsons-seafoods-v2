'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';

export async function deleteMessage(messageId: number) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', messageId);

        if (error) throw error;

        revalidatePath('/admin/messages');

        return { success: true };
    } catch (error) {
        console.error('Error deleting message:', error);
        return { success: false, error: 'Failed to delete message' };
    }
}
