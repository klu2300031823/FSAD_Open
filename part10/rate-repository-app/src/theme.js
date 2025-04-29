import { Platform } from 'react-native'; // 10.9

const theme = { // 10.4 theme configuration
    colors: {
        appBarBackground: '#FFB2D0', // pink
        headerFontColor: '#FFFFFF',
    },
    fontSizes: {
        body: 14,
        subheading: 18,
    },
    fonts: {
        main: Platform.select({ // 10.9 - platform specific fonts
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
      },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;