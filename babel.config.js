module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@stores': './src/stores',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@config': './src/config',
          '@services': './src/services',
        },
      },
    ],
  ],
};
