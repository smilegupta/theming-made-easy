const themes = ["surface", "primary", "success", "danger", "warning"];

function generateTailwindPalette(color) {
  return {
    DEFAULT: `hsl(var(--${color}) / <alpha-value>)`,
    0: `hsl(var(--${color}-0) / <alpha-value>)`,
    10: `hsl(var(--${color}-10) / <alpha-value>)`,
    25: `hsl(var(--${color}-25) / <alpha-value>)`,
    50: `hsl(var(--${color}-50) / <alpha-value>)`,
    100: `hsl(var(--${color}-100) / <alpha-value>)`,
    200: `hsl(var(--${color}-200) / <alpha-value>)`,
    300: `hsl(var(--${color}-300) / <alpha-value>)`,
    400: `hsl(var(--${color}-400) / <alpha-value>)`,
    500: `hsl(var(--${color}-500) / <alpha-value>)`,
    600: `hsl(var(--${color}-600) / <alpha-value>)`,
    700: `hsl(var(--${color}-700) / <alpha-value>)`,
    800: `hsl(var(--${color}-800) / <alpha-value>)`,
    900: `hsl(var(--${color}-900) / <alpha-value>)`,
    950: `hsl(var(--${color}-950) / <alpha-value>)`,
    1000: `hsl(var(--${color}-1000) / <alpha-value>)`,
  };
}

// ES Module syntax
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        on: themes.reduce((acc, theme) => {
          acc[theme] = generateTailwindPalette(`on-${theme}`);
          return acc;
        }, {}),
        ...themes.reduce((acc, theme) => {
          acc[theme] = generateTailwindPalette(theme);
          return acc;
        }, {}),
      },
      screens: {
        d: "62.5rem", // desktop
      },
    },
  },
  plugins: [],
};
