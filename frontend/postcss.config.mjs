import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: {
    tailwindcss: {}, // This is the Tailwind CSS plugin itself
    autoprefixer: {}, // This is used to automatically add vendor prefixes to CSS
    "@tailwindcss/postcss": {}, // This is the PostCSS plugin for Tailwind CSS (as per the error message)
  },
};
