const Fonts =
  'system-ui, "Manrope", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const MainTheme = {
  dark: true,
  colors: {
    highlightGreen: '#638063',
    greenGrad: 'linear-gradient(144deg, rgba(128, 173, 128, 0.60) -24.52%, rgba(75, 100, 75, 0.60) -1.71%, rgba(57, 64, 50, 0.60) 44.6%, rgba(35, 40, 35, 0.60) 113.71%)',
    darkGreen: "rgba(35, 40, 35, 0.40)",
    dark: '#070807',
    text: 'rgba(255, 255, 255)',
    textMuted: 'rgba(255, 255, 255, 0.60)',
    inputBackground: 'rgba(255, 255, 255, 0.20)',
    highlightDanger: "#935E55",
    danger: '#54332D',
  },
  fonts: Platform.select({
    web: {
      regular: {
        fontFamily: Fonts,
        fontWeight: '400',
      },
      light: {
        fontFamily: Fonts,
        fontWeight: '300',
      },
      bold: {
        fontFamily: Fonts,
        fontWeight: '700',
      },
      heavy: {
        fontFamily: Fonts,
        fontWeight: '900',
      },
    },
    default: {
      titleLarge: {
        fontFamily: Fonts,
        fontWeight: 'regular',
        fontSize: 24,
        lineHeight: 32,
      },
      titleLargeBold: {
        fontFamily: Fonts,
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 32,
      },
      titleSmall: {
        fontFamily: Fonts,
        fontWeight: 'regular',
        fontSize: 16,
        lineHeight: 32,
      },
      titleSmallBold: {
        fontFamily: Fonts,
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 32,
      },
      body: {
        fontFamily: Fonts,
        fontWeight: 'regular',
        fontSize: 14,
        lineHeight: 32,
      },
      bodyBold: {
        fontFamily: Fonts,
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 32,
      },
      body: {
        fontFamily: Fonts,
        fontWeight: 'light',
        fontSize: 14,
        lineHeight: 32,
      },
      bodySmall: {
        fontFamily: Fonts,
        fontWeight: 'regular',
        fontSize: 12,
        lineHeight: 32,
      },
      bodySmallBold: {
        fontFamily: Fonts,
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 32,
      },
      button: {
        fontFamily: Fonts,
        fontWeight: 'heavy',
        fontStyle: 'capitalize',
        fontSize: 14,
        lineHeight: 32,
      },

    },
  }),
};

export default MainTheme;