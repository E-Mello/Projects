/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        // sharp transparent none
        "sharp-white": "5px 5px 0 0 rgba(0,0,0,0)",
        //teste
        "sharp-blue": "5px 5px 0 0 rgba(255,255,255,1)",
        //Default
        "sharp": "2px 2px 0 rgba(0,0,0,1)",
        // sharp with 25% transparent
        "sharp-white/25": "5px 5px 0 0 rgba(255,255,255,0.25)"
      },
      dropShadow: {
        'sharp/25': '1px 1px 0 rgba(0, 0, 0, 0.25)',
        'sharp/50': '1px 1px 0 rgba(0, 0, 0, 0.5)',
        'sharp/75': '1px 1px 0 rgba(0, 0, 0, 0.75)',
        sharp: '1px 1px 0 rgb(0, 0, 0)',
      },
    }
  },
  plugins: [],
};