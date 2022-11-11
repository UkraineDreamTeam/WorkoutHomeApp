module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'max-len': ['error', 120],
        'unused-imports/no-unused-imports-ts': 'error',
        'unused-imports/no-unused-vars-ts': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],

        // 'prettier/prettier': 'off',
        // 'comma-dangle': [
        //   'error',
        //   {
        //     arrays: 'never',
        //     objects: 'always',
        //     imports: 'never',
        //     exports: 'never',
        //     functions: 'always',
        //   },
        // ],

        // 'comma-dangle': [
        //   'error',
        //   {
        //     arrays: 'always',
        //     objects: 'always',
        //     imports: 'never',
        //     exports: 'never',
        //     functions: 'never',
        //   },
        // ],
      },
    },
  ],
};
