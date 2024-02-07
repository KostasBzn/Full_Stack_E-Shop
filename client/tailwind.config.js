/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#DF7A5E",
        customColor1: "#3C405B",
        customColor2: "#82B29A",
        backgroundColor: "#f4f1de",

        "customColor-dark": "#A0523D", // A darker shade for hover effect, adjust as needed
      },
      screens: {
        xs: "480px", // Custom extra small screen size
        sm: "640px", // Small screen size
        md: "768px", // Medium screen size
        lg: "1024px", // Large screen size
        xl: "1280px", // Extra large screen size
      },
    },
  },
  plugins: [],
};
