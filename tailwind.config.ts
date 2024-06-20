import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

// px 값을 객체로 변환하는 함수
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

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: '767px' },
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
      borderRadius: {
        '6px': '6px',
      },
      width: {
        '350px': '350px',
      },
      height: {
        '48px': '48px',
      },
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
      addUtilities(
        {
          '.button_large_active': {
            width: '350px',
            height: '48px',
            borderRadius: '6px',
            border: '0',
            backgroundColor: '#ea3c12',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '700',
          },
          '.button_large_disActive': {
            width: '350px',
            height: '48px',
            borderRadius: '6px',
            border: '1px solid #ea3c12',
            backgroundColor: '#ffffff',
            color: '#ea3c12',
            fontSize: '16px',
            fontWeight: '700',
          },
          '.button_medium_active': {
            width: '108px',
            height: '37px',
            borderRadius: '6px',
            border: '0',
            backgroundColor: '#ea3c12',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '700',
          },
          '.button_medium_disActive': {
            width: '108px',
            height: '37px',
            borderRadius: '6px',
            border: '1px solid #ea3c12',
            backgroundColor: '#ffffff',
            color: '#ea3c12',
            fontSize: '14px',
            fontWeight: '700',
          },
          '.button_small_active': {
            width: '82px',
            height: '32px',
            borderRadius: '6px',
            border: '0',
            backgroundColor: '#ea3c12',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '400',
          },
          '.button_small_disActive': {
            width: '82px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid #ea3c12',
            backgroundColor: '#ffffff',
            color: '#ea3c12',
            fontSize: '12px',
            fontWeight: '400',
          },
          '.button_large_inActive': {
            width: '335px',
            height: '48px',
            borderRadius: '6px',
            border: '0',
            backgroundColor: '#a4a1aa',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '700',
          },
          '.button_small_inActive': {
            width: '95px',
            height: '37px',
            borderRadius: '6px',
            border: '0',
            backgroundColor: '#a4a1aa',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '700',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};

export default config;
