// tailwind.config.ts

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "black-primary": "#1b1b1b",
        "white-primary": "#dddbd7",
        "green-soft": "var(--green-soft)",
        "ivory-light": "var(--ivory-light)",
        "gray-muted": "var(--gray-muted)",
        "pink-accent": "var(--pink-accent)",
        "yellow-bright": "var(--yellow-bright)",
        "gray-dark": "var(--gray-dark)",
      },
    },
  },
  plugins: [],
};
export default config;
