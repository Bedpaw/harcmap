const chalk = require('chalk');

class AppLogoPlugin {
  constructor (config = { AppName, AppVersion }) {
    this.config = config;
  }

  apply (compiler) {
    const { AppName, AppVersion } = this.config;

    compiler.hooks.watchRun.tapAsync(
      'AppLogoPlugin',
      (compilation, callback) => {
        this.clear();
        this.newLine();
        this.writeLogo(`${AppName} v${AppVersion}`, 44);
        this.newLine(2);
        callback();
      },
    );
  }

  writeLogo (text, length) {
    const oneSideLength = (length - text.length) / 2;
    this.write(
      chalk.bgGreen.bold(
        ' '.repeat(oneSideLength) +
        text +
        ' '.repeat(oneSideLength),
      ),
    );
  }

  write (text) {
    process.stderr.write(text);
  }

  newLine (number = 1) {
    process.stderr.write('\n'.repeat(number));
  }

  clear () {
    console.clear();
  }
}

module.exports = AppLogoPlugin;
