/** @type {import('tailwindcss').Config} */
module.exports = {  
  
  content: ["./src/**/*.html"],
  theme: {
    extend: {      
      screens: {
        '2xl': '1440px',
      },  
      spacing:{
        'xs': '0.625rem',
        'sm': '1.25rem',
        'md': '2.5rem',
        'lg': '5rem',
        'xl': '10rem',
      },
      fontFamily: {
        montserrat: "'Montserrat', 'sans-serif'",
        Inter:"'Inter', 'Helvetica Neue'",
        Roboto:"'Roboto'"
      },
      colors: {
        primary: '#bc082e',
        secondary: '#000000',
        quaternary: '#F5F5F5',
        tertiery: '#FFFFFF',
        magenta: '#e72754', 
        gray: '#7e7e7e',
        'light-gray': '#d9d9d9',
        'white-smoke': '#f5f5f5',
        'light-blue': '#d0e4f5',
      },
      fontSize: {
        16 : '16px',
        64 : 'clamp(2.5rem, 2.125rem + 1.875vw, 4rem)',
        36 : 'clamp(1.875rem, 1.7813rem + 0.4688vw, 2.25rem)',
        32 : 'clamp(1.5rem, 1.375rem + 0.625vw, 2rem)',
      },
      listStyleType: {
        'custom-square': 'square',
        'custom-dot': 'circle',
      },      
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('nav-link', '& > li > a');
    }
  ],
}