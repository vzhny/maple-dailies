require("dotenv").config();
const enablePurge = process.env.ENABLE_PURGE || false;
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const forms = require("@tailwindcss/forms");

module.exports = {
  purge: {
    enabled: enablePurge,
    content: ["./src/**/*.html", "./src/**/*.scss"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    container: {
      padding: "1rem",
    },
    zIndex: {
      ...defaultTheme.zIndex,
      900: 900,
      1000: 1000,
    },
    fontFamily: {
      sans: ["DotGothic16", ...defaultTheme.fontFamily.sans],
      mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        ...defaultTheme.colors,
        gray: colors.trueGray,
        green: colors.emerald,
      },
    },
  },
  plugins: [forms],
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      textColor: ["visited"],
    },
  },
};
