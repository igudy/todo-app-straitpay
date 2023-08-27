/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
	  },
	extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
	//   extend: {
	// 	  fontfamily: {
	// 		  'space-grotesk': ['Space Grotesk', 'sans']
	// 	  },
	// },
  },
  plugins: [],
}
