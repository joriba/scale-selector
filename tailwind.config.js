/** @type {import('tailwindcss').Config} */
module.exports = {
  // only apply hover: styles on devices with a real pointer, so taps on
  // the iPad don't leave elements stuck in their hover state
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./generateScales.js"],
  theme: {
    extend: {},
  },
  plugins: [],
}

