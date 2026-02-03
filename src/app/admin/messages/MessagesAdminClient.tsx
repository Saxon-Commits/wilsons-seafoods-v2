'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ContactSubmission } from '@/types';
import { deleteMessage } from './actions';

interface MessagesAdminClientProps {
    messages: ContactSubmission[];
}

const MessagesAdminClient: React.FC<MessagesAdminClientProps> = ({
    messages: initialMessages,
}) => {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        const result = await deleteMessage(id);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to delete message');
        }
    };

    if (initialMessages.length === 0) {
        return (
            <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700 text-center">
                <p className="text-slate-400 text-lg">No messages yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
            <div className="space-y-4">
                {initialMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-slate-700 p-5 rounded-md border border-slate-600"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                                <p className="text-sm sm:text-base text-slate-400 break-all">{msg.email}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {msg.created_at ? new Date(msg.created_at).toLocaleString() : 'Unknown Date'}
                                </p>
                            </div>
                            <button
                                onClick={() => msg.id && handleDelete(msg.id)}
                                className="text-red-400 hover:text-red-300 text-sm font-medium self-start sm:self-auto px-3 py-1.5 rounded bg-red-900/20 hover:bg-red-900/30 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                        <p className="text-slate-300 text-base whitespace-pre-wrap break-words">
                            {msg.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesAdminClient;
