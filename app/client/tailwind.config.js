"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#6E62E5",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#e2e1fb",
                    foreground: "#000000",
                },
            },
        },
    },
    plugins: [],
};
