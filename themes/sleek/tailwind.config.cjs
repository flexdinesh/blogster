/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.astro"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
          main: "rgb(var(--color-primary-main) / <alpha-value>)",
        },
        text: {
          heading: "rgb(var(--color-text-heading) / <alpha-value>)",
          base: "rgb(var(--color-text-base) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          inverted: "rgb(var(--color-text-inverted) / <alpha-value>)",
          code: "rgb(var(--color-text-code) / <alpha-value>)",
        },
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        "bg-inverted": "rgb(var(--color-bg-inverted) / <alpha-value>)",
        "bg-code": "rgb(var(--color-bg-code) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
        "selection-bg": "rgb(var(--color-selection-bg) / <alpha-value>)",
        "selection-text": "rgb(var(--color-selection-text) / <alpha-value>)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              "text-decoration": "none",
              "background-repeat": "no-repeat",
              "background-size": "100% 1.5px",
              "background-position": "0 100%",
              "background-image":
                "linear-gradient(to right, rgb(var(--color-link)/1), rgb(var(--color-link)/1))",
              "&:hover": {
                color: "rgb(var(--color-link))",
              },
            },
            ul: {
              "padding-left": 0,
              "list-style": "none",
            },
            "ul > li": {
              position: "relative",
              "padding-left": "1.375rem",
            },
            "ul > li::before": {
              position: "absolute",
              left: 0,
              content: '"»"',
              color: "rgb(var(--color-text-muted))",
            },
            ol: {
              "padding-left": "1.125rem",
            },
            "ol > li::marker": {
              color: "rgb(var(--color-text-muted))",
            },
            "h1, h2, h3, h4, h5": {
              color: "rgb(var(--color-text-heading))",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
