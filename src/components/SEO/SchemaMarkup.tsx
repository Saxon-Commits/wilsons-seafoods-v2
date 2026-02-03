import React from 'react';
import { HomepageContent, OpeningHour, SocialLinks } from '../../types';

interface SchemaMarkupProps {
    content: HomepageContent;
    hours: OpeningHour[];
    socialLinks: SocialLinks;
    phoneNumber: string;
    abn: string;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ content, hours, socialLinks, phoneNumber, abn }) => {
    // Helper to format hours for Schema (e.g., "Mo-Fr 09:00-17:00")
    // This is a naive implementation; for production, we might need more robust parsing
    // if the `OpeningHour` type stores days/times loosely.
    // Assuming `day` is like "Monday" and `time` is "09:00 - 14:30" or similar.
    const formatOpeningHours = (hours: OpeningHour[]) => {
        return hours.map(h => {
            const days = h.day === "Monday" ? "Mo" :
                h.day === "Tuesday" ? "Tu" :
                    h.day === "Wednesday" ? "We" :
                        h.day === "Thursday" ? "Th" :
                            h.day === "Friday" ? "Fr" :
                                h.day === "Saturday" ? "Sa" :
                                    h.day === "Sunday" ? "Su" : h.day;

            // Assuming time is something we can use or might need splitting.
            // Schema expects "09:00-17:00". If our data has "opens" and "closes", great.
            // But `OpeningHour` seems to just have `time` string. 
            // We will pass it through but for valid schema it should be strictly formatted.
            // For now, let's map the structure we saw in `index.html` manually if possible, or dynamic.
            // Since the type is just { day: string, time: string }, 
            // we'll construct the best effort spec.
            return {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": h.day,
                "opens": h.time.split('-')[0]?.trim() || "09:00", // Fallback parsing
                "closes": h.time.split('-')[1]?.trim() || "17:00"
            };
        });
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://wilsonsseafoods.com.au/#business",
        "name": "Wilsons Seafoods",
        "image": content.about_image_url || "https://wilsonsseafoods.com.au/og-image.jpg",
        "logo": "https://wilsonsseafoods.com.au/logo.png",
        "url": "https://wilsonsseafoods.com.au",
        "telephone": phoneNumber,
        "priceRange": "$$", // Could be dynamic if we analyzed product prices
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "5 Sussex St",
            "addressLocality": "Glenorchy",
            "addressRegion": "TAS",
            "postalCode": "7010", // Hardcoded for now unless we add to SiteSettings
            "addressCountry": "AU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -42.832,
            "longitude": 147.274
        },
        "openingHoursSpecification": formatOpeningHours(hours),
        "sameAs": [
            socialLinks?.facebook,
            socialLinks?.instagram
        ].filter(Boolean),
        "description": content.about_text || "Hobart's premier supplier of fresh Tasmanian seafood...",
        "servesCuisine": "Seafood",
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "AUD",
        // Add ABN if useful for specific local business schemas, though not standard Schema.org property
        // identifiers: [{ "@type": "PropertyValue", "propertyID": "ABN", "value": abn }] 
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default SchemaMarkup;
