const config = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: [],
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular',
        htmlWhitespaceSensitivity: 'css',
      },
    },
    {
      files: '*.component.html',
      options: {
        parser: 'angular',
        printWidth: 80,
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 2,
      },
    },
  ],
};

export default config;
