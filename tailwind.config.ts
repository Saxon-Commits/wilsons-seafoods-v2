import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            },
            colors: {
                'brand-blue': '#0ea5e9',
                'brand-gold': '#fbbf24',
                'ice-blue': '#a8d8f0',
            },
            keyframes: {
                'slow-zoom': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
            },
            animation: {
                'slow-zoom': 'slow-zoom 20s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};

export default config;
