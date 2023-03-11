module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
      'react-native-reanimated/plugin',
    ],
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@constants': './src/shared/constants',
          '@theme': './src/shared/theme',
          '@shared': './src/shared',

          '@screens': './src/screens',
          '@assets': './src/assets',
          '@redux': './src/redux',
          '@icons-components': './src/components/icons',
        },
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@shared': './src/shared',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@redux': './src/redux',
          '@icons-components': './src/components/icons',
        },
      },
    ],
  ],
};
