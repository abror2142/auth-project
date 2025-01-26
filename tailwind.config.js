module.exports = {
  content: [
      './templates/**/*.twig', // Ensure Tailwind scans your Twig templates
      './assets/**/*.js', // Include paths to JS files if needed
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 3s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  variants: {},
  plugins: [],
};
