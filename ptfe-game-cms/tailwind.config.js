/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: '#565656',
        secondary: '#C3C6D1',
        tertiary: '#858997',
        danger: '#FF675B',
        label: '#C7C7C7',
        dark: '#858997',
        light: {
          100: '#809FB8',
          200: '#87C6E8'
        },
        success: {
          100: '#1AD598'
        }
      },
      backgroundColor: {
        primary: '#87C6E8',
        secondary: '#F5F5F5',
        danger: '#FF675B',
        bg: '#F8F8F8',
        light: {
          100: '#C3C6D129'
        },
        success: {
          100: '#1AD5984D',
          200: '#28B1A5'
        }
      },
      borderColor: {
        primary: '#87C6E8',
        secondary: '#F5F5F5',
        tertiary: '#E5E5E5',
        danger: '#FF675B',
        light: {
          100: '##D9E1E7CC'
        },
        success: {
          100: '#28B1A5'
        }
      },
      fontSize: {
        lg: '36px',
        md: '20px',
        sm: '14px'
      },
      lineHeight: {
        lg: '50px',
        md: '27px',
        sm: '21px'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        circular: ['Circular Std Black', 'sans-serif']
      },
      boxShadow: {
        primaryBtn: '0px 4px 8px #0000001F',
        sidebar: '18px 4px 35px #00000005',
        card: '0px 4px 4px #0000000A',
        chartCard: '0px 10px 30px #13171F33'
      }
    }
  },
  plugins: []
};
