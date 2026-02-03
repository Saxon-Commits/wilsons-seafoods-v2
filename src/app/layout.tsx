import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { createClient } from "@/lib/supabase";
import { INITIAL_LOGO_URL } from "@/constants";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wilson's Seafoods - Fresh Tasmanian Seafood",
    template: "%s | Wilson's Seafoods",
  },
  description: "Premium fresh seafood in Glenorchy, Tasmania. Locally sourced, sustainably caught. Visit our fish market or order wholesale.",
  keywords: ["seafood", "fresh fish", "Tasmania", "Glenorchy", "wholesale seafood", "fish market"],
  authors: [{ name: "Wilson's Seafoods" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://wilsonsseafoods.com.au",
    siteName: "Wilson's Seafoods",
    title: "Wilson's Seafoods - Fresh Tasmanian Seafood",
    description: "Premium fresh seafood in Glenorchy, Tasmania. Locally sourced, sustainably caught.",
  },
};

async function getSettings() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  const logoUrl = settings?.logo_url || INITIAL_LOGO_URL;
  const socialLinks = settings?.social_links || { facebook: '', instagram: '' };
  const abn = settings?.abn || '';
  const phoneNumber = settings?.phone_number || '(03) 6272 6600';

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <ConditionalLayout
          logoUrl={logoUrl}
          socialLinks={socialLinks}
          abn={abn}
          phoneNumber={phoneNumber}
        >
          {children}
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  );
}
