// Existing types from original project
export interface FishProduct {
    id?: number;
    name: string;
    price: string;
    image_url: string;
    is_fresh?: boolean;
    on_order?: boolean;
    out_of_stock?: boolean;
    is_visible?: boolean;
    featured?: boolean;
    sort_order?: number;
    category?: string;
    description?: string;
}

export interface OpeningHour {
    day: string;
    time: string;
}

export interface SocialLinks {
    facebook: string;
    instagram: string;
}

export interface HomepageContent {
    hero_title: string;
    hero_subtitle: string;
    announcement_text: string;
    about_text: string;
    about_image_url: string;
    gateway1_image_url?: string;
    gateway1_title?: string;
    gateway1_description?: string;
    gateway1_button_text?: string;
    gateway1_button_url?: string;
    gateway2_image_url?: string;
    gateway2_title?: string;
    gateway2_description?: string;
    gateway2_button_text?: string;
    gateway2_button_url?: string;
}

export interface SiteSettings {
    logo_url: string;
    background_url: string | null;
    social_links?: SocialLinks;
    opening_hours?: OpeningHour[];
    abn?: string;
    phone_number?: string;
    categories?: string[];
}

export interface ContactSubmission {
    id?: number;
    created_at?: string;
    name: string;
    email: string;
    message: string;
}

// New types for multi-page features
export interface BlogPost {
    id?: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    meta_description?: string;
    author: string;
    featured_image_url: string;
    category: string;
    published: boolean;
    published_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Review {
    id?: number;
    customer_name: string;
    rating: number;
    review_text: string;
    is_featured: boolean;
    is_approved: boolean;
    created_at?: string;
}

export interface TeamMember {
    id?: number;
    name: string;
    role: string;
    bio: string;
    photo_url: string;
    display_order: number;
    is_visible: boolean;
}
