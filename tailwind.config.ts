/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Tambahkan di sini
        gilland: ['var(--font-gilland)', 'sans-serif'],
        graziemille: ['var(--font-graziemille)', 'serif'],
      },
    },
  },
  plugins: [],
};