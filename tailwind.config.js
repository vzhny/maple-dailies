require("dotenv").config();
const enablePurge = process.env.ENABLE_PURGE || false;
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

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
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
      },
      fontFamily: {
        sans: ["DotGothic16", ...defaultTheme.fontFamily.sans],
        mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked", "last"],
      borderWidth: ["last"],
      textColor: ["visited"],
    },
  },
  plugins: [],
};
