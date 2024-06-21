import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

const createPxRange = (max: number) => {
  const result: { [key: string]: string } = {};
  for (let i = 0; i <= max; i++) {
    result[`${i}px`] = `${i}px`;
  }
  return result;
};

const px0_10 = createPxRange(10);
const px0_100 = createPxRange(100);
const px0_200 = createPxRange(200);
const px0_500 = createPxRange(500);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        rokaf: ['ROKAF Sans', 'sans-serif'],
      },
      screens: {
        pc: { min: '1200px' },
        tablet: { min: '768px', max: '1023px' },
      },
      zIndex: {
        dropdown: '10',
        modalbackground: '20',
        modalbody: '30',
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      spacing: px0_200,
      borderRadius: px0_100,
      width: px0_500,
      height: px0_500,
      colors: {
        primary: '#9935ff',
        purple10: '#f8f0ff',
        purple20: '#dcb9ff',
        purple30: '#9935ff',
        purple40: '#6e0ad1',
        red10: '#FFEBE7',
        red20: '#FFAF9B',
        red30: '#FF8D72',
        red40: '#FF4040',
        blue10: '#cce6ff',
        blue20: '#0080ff',
        green10: '#d4f7d4',
        green20: '#20a81e',
        gray05: '#fafafa',
        gray10: '#f2f2f3',
        gray20: '#e5e4e7',
        gray30: '#cbc9cf',
        gray40: '#a4a1aa',
        gray50: '#7d7986',
        white: '#ffffff',
        black: '#111322',
        'custom-orange': '#ea3c12',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.button_large_active': {
          width: 'max-content',
          height: '48px',
          padding: '14px 136px',
          borderRadius: '6px',
          border: '0',
          backgroundColor: '#ea3c12',
          fontFamily: 'Spoqa Han Sans Neo',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '20px',
        },
        '.button_large_active:hover': {
          backgroundColor: '#d32f2f',
        },
        '.button_large_disActive': {
          width: 'max-content',
          height: '48px',
          padding: '14px 136px',
          borderRadius: '6px',
          border: '1px solid #ea3c12',
          backgroundColor: '#ffffff',
          fontFamily: 'Spoqa Han Sans Neo',
          color: '#ea3c12',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '20px',
        },
        '.button_large_disActive:hover': {
          backgroundColor: '#ffe5d4',
        },
        '.button_medium_active': {
          width: 'max-content',
          height: '37px',
          padding: '10px 20px',
          borderRadius: '6px',
          border: '0',
          backgroundColor: '#ea3c12',
          color: '#ffffff',
          fontFamily: 'Spoqa Han Sans Neo',
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '17px',
        },
        '.button_medium_active:hover': {
          backgroundColor: '#d32f2f',
        },
        '.button_medium_disActive': {
          width: 'max-content',
          height: '37px',
          padding: '10px 20px',
          borderRadius: '6px',
          border: '1px solid #ea3c12',
          backgroundColor: '#ffffff',
          color: '#ea3c12',
          fontFamily: 'Spoqa Han Sans Neo',
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '17px',
        },
        '.button_medium_disActive:hover': {
          backgroundColor: '#ffe5d4',
        },
        '.button_small_active': {
          width: 'max-content',
          height: '32px',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '0',
          backgroundColor: '#ea3c12',
          fontFamily: 'Spoqa Han Sans Neo',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '16px',
        },
        '.button_small_active:hover': {
          backgroundColor: '#d32f2f',
        },
        '.button_small_disActive': {
          width: 'max-content',
          height: '32px',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ea3c12',
          fontFamily: 'Spoqa Han Sans Neo',
          backgroundColor: '#ffffff',
          color: '#ea3c12',
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '16px',
        },
        '.button_small_disActive:hover': {
          backgroundColor: '#ffe5d4',
        },
        '.button_large_disApply': {
          width: 'max-content',
          height: '48px',
          borderRadius: '6px',
          padding: '14px 136px',
          border: '0',
          fontFamily: 'Spoqa Han Sans Neo',
          backgroundColor: '#a4a1aa',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '20px',
        },
        '.button_large_disApply:hover': {
          backgroundColor: '#8c8a92', // 호버 시 배경색 변경
        },
        '.button_small_disApply': {
          width: 'max-content',
          height: '37px',
          borderRadius: '6px',
          padding: '10px 20px',
          border: '0',
          fontFamily: 'Spoqa Han Sans Neo',
          backgroundColor: '#a4a1aa',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '17px',
        },
        '.button_small_disApply:hover': {
          backgroundColor: '#8c8a92', // 호버 시 배경색 변경
        },
        '.button_Ok': {
          width: '120px',
          height: '48px',
          borderRadius: '8px',
          border: '0',
          backgroundColor: '#ea3c12',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '500',
        },
        '.button_Ok:hover': {
          backgroundColor: '#d32f2f',
        },
      });
    },
  ],
};

export default config;
