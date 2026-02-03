'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Review } from '@/types';
import { deleteReview } from './actions';

interface ReviewsAdminClientProps {
    reviews: Review[];
}

const ReviewsAdminClient: React.FC<ReviewsAdminClientProps> = ({ reviews }) => {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        const result = await deleteReview(id);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to delete review');
        }
    };

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
                <h3 className="text-blue-300 font-semibold mb-2">💡 How Reviews Work</h3>
                <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Copy reviews from your Google Business profile and add them here</li>
                    <li>• All reviews are immediately visible on the homepage</li>
                    <li>• Customers click "Leave a Google Review" button to add new ones</li>
                    <li>• Limit to 6-9 best reviews for optimal display</li>
                </ul>
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700 text-center">
                    <p className="text-slate-400 text-lg mb-4">No reviews yet.</p>
                    <p className="text-slate-500 text-sm">
                        Add reviews manually in Supabase for now. A review form will be added soon!
                    </p>
                </div>
            ) : (
                <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">All Reviews ({reviews.length})</h2>
                    </div>

                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-slate-700 p-5 rounded-md border border-slate-600"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">{review.customer_name}</h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-slate-600'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => review.id && handleDelete(review.id)}
                                    className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1.5 rounded bg-red-900/20 hover:bg-red-900/30 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="text-slate-300 whitespace-pre-wrap mb-3">"{review.review_text}"</p>
                            <p className="text-xs text-slate-500">
                                {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Recently'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsAdminClient;
