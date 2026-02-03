'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { OpeningHour, SocialLinks } from '@/types';
import { uploadImage, updateCategories, updateSocialLinks, updateContactInfo, updateOpeningHours } from './actions';

interface SettingsAdminClientProps {
    logoUrl: string;
    backgroundUrl: string;
    categories: string[];
    socialLinks: SocialLinks;
    abn: string;
    phoneNumber: string;
    openingHours: OpeningHour[];
}

const SettingsAdminClient: React.FC<SettingsAdminClientProps> = ({
    logoUrl: initialLogoUrl,
    backgroundUrl: initialBackgroundUrl,
    categories: initialCategories,
    socialLinks: initialSocialLinks,
    abn: initialAbn,
    phoneNumber: initialPhoneNumber,
    openingHours: initialOpeningHours,
}) => {
    const router = useRouter();
    const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
    const [abn, setAbn] = useState(initialAbn);
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
    const [openingHours, setOpeningHours] = useState(initialOpeningHours);
    const [categories, setCategories] = useState(initialCategories);
    const [newCategory, setNewCategory] = useState('');
    const [uploading, setUploading] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const bgInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (field: 'logo_url' | 'background_url', file: File | null) => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        const result = await uploadImage(formData, field);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || 'Failed to upload image');
        }

        setUploading(false);
    };

    const handleSaveSocialLinks = async () => {
        const result = await updateSocialLinks(socialLinks);
        if (!result.success) {
            alert(result.error || 'Failed to update social links');
        }
    };

    const handleSaveContactInfo = async () => {
        const result = await updateContactInfo(abn, phoneNumber);
        if (!result.success) {
            alert(result.error || 'Failed to update contact info');
        }
    };

    const handleSaveOpeningHours = async () => {
        const result = await updateOpeningHours(openingHours);
        if (!result.success) {
            alert(result.error || 'Failed to update opening hours');
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        if (categories.includes(newCategory.trim())) {
            alert('Category already exists');
            return;
        }

        const newCategories = [...categories, newCategory.trim()];
        const result = await updateCategories(newCategories);

        if (result.success) {
            setCategories(newCategories);
            setNewCategory('');
            router.refresh();
        } else {
            alert(result.error || 'Failed to add category');
        }
    };

    const handleRemoveCategory = async (category: string) => {
        if (!window.confirm(`Remove category "${category}"?`)) return;

        const newCategories = categories.filter((c) => c !== category);
        const result = await updateCategories(newCategories);

        if (result.success) {
            setCategories(newCategories);
            router.refresh();
        } else {
            alert(result.error || 'Failed to remove category');
        }
    };

    return (
        <div className="space-y-8">
            {/* Site Appearance */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Site Appearance</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Logo</label>
                        <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('logo_url', e.target.files?.[0] || null)}
                            className="w-full text-base text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-300 hover:file:bg-slate-600 transition-colors"
                            disabled={uploading}
                        />
                        {initialLogoUrl && (
                            <img src={initialLogoUrl} alt="Logo" className="mt-2 rounded-md max-h-24 object-contain bg-white p-2" />
                        )}
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Background Image</label>
                        <input
                            ref={bgInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('background_url', e.target.files?.[0] || null)}
                            className="w-full text-base text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-300 hover:file:bg-slate-600 transition-colors"
                            disabled={uploading}
                        />
                        {initialBackgroundUrl && (
                            <img src={initialBackgroundUrl} alt="Background" className="mt-2 rounded-md max-h-32 object-cover w-full" />
                        )}
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Product Categories</h2>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name"
                            className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                        />
                        <button
                            onClick={handleAddCategory}
                            className="bg-brand-blue hover:bg-brand-blue/80 text-white font-bold px-6 py-3 rounded-md transition-colors"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                className="bg-slate-700 px-4 py-2 rounded-full flex items-center gap-2"
                            >
                                <span className="text-white">{cat}</span>
                                <button
                                    onClick={() => handleRemoveCategory(cat)}
                                    className="text-red-400 hover:text-red-300 text-xl leading-none"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Social Media</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Facebook URL</label>
                        <input
                            type="text"
                            value={socialLinks.facebook || ''}
                            onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Instagram URL</label>
                        <input
                            type="text"
                            value={socialLinks.instagram || ''}
                            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                        />
                    </div>
                    <button
                        onClick={handleSaveSocialLinks}
                        className="bg-brand-blue hover:bg-brand-blue/80 text-white font-bold px-6 py-3 rounded-md transition-colors"
                    >
                        Save Social Links
                    </button>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Contact Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">ABN</label>
                        <input
                            type="text"
                            value={abn}
                            onChange={(e) => setAbn(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            placeholder="XX XXX XXX XXX"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-300 mb-2">Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            placeholder="(03) 6272 6600"
                        />
                    </div>
                    <button
                        onClick={handleSaveContactInfo}
                        className="bg-brand-blue hover:bg-brand-blue/80 text-white font-bold px-6 py-3 rounded-md transition-colors"
                    >
                        Save Contact Info
                    </button>
                </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-2xl font-semibold mb-4 font-serif">Opening Hours</h2>
                <div className="space-y-4">
                    {openingHours.map((hour, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <span className="w-32 text-slate-300 font-medium text-base">{hour.day}</span>
                            <input
                                type="text"
                                value={hour.time}
                                onChange={(e) => {
                                    const newHours = [...openingHours];
                                    newHours[index] = { ...newHours[index], time: e.target.value };
                                    setOpeningHours(newHours);
                                }}
                                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-white text-lg"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSaveOpeningHours}
                        className="bg-brand-blue hover:bg-brand-blue/80 text-white font-bold px-6 py-3 rounded-md transition-colors"
                    >
                        Save Opening Hours
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsAdminClient;
