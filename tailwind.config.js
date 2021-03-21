require("dotenv").config();
const enablePurge = process.env.ENABLE_PURGE || false;
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: enablePurge,
    content: ["./src/**/*.html", "./src/**/*.scss"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["DotGothic16", ...defaultTheme.fontFamily.sans],
        mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: { backgroundColor: ["checked"], borderColor: ["checked"] },
  },
  plugins: [],
};
