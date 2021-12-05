const ESLintWebpackPlugin = require('eslint-webpack-plugin');

class EslintConfig {
  constructor () {
    return new ESLintWebpackPlugin({
      extensions: ['js', 'vue', 'ts'],
      formatter: require.resolve('eslint-friendly-formatter'),
      eslintPath: require.resolve('eslint'),
      useEslintrc: true,
    });
  }
}

module.exports = EslintConfig;
