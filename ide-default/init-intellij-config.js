const chalk = require('chalk');

console.clear();
console.log(chalk.bold('\nInitialize Intellij configuration\n'));

require('./set-default-webpack');
require('./set-default-eslint');

console.log(chalk.bold.green('\n  All done!'));
