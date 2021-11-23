const chalk = require('chalk');

class AppLogoPlugin {
  constructor (config = { AppName, AppVersion }) {
    this.config = config;
  }

  apply (compiler) {
    const { AppName, AppVersion } = this.config;
    const mode = this.capitalizeFirstChar(compiler.options.mode);
    const watch = this.capitalizeFirstChar(compiler.options.watch ? 'watch' : 'single run');

    compiler.hooks.watchRun.tapAsync(
      'AppLogoPlugin',
      (compilation, callback) => {
        this.clear();
        this.newLine();
        this.writeLogo(`${AppName} Client v${AppVersion}`, 44);
        this.newLine();
        this.write(`  ${mode} - ${watch}`);
        this.newLine(2);
        callback();
      },
    );

    compiler.hooks.done.tapAsync(
      'AppLogoPlugin',
      (compilation, callback) => {
        if (compiler.options.watch) {
          setTimeout(() => this.write('  Waiting for changes...'), 100);
        }
        callback();
      },
    );
  }

  capitalizeFirstChar (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
