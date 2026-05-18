import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{jsx,tsx}',
        './components/**/*.{jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-exo2)', 'sans-serif'], //sans is default font, we are overriding it with our custom font
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
            },
        },
    },

    plugins: [typography],
}

export default config;