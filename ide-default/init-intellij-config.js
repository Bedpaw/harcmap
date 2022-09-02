const chalk = require('chalk');
const { setDefaultESLint } = require('./set-default-eslint');
const { setDefaultWebpack } = require('./set-default-webpack');

(async function () {
  try {
    console.clear();
    console.log(chalk.bold('\nInitialize Intellij configuration\n'));

    await setDefaultESLint();
    await setDefaultWebpack();

    console.log(chalk.bold.green('\n  All done!'));
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
