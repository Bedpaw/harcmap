const chalk = require('chalk');
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/duration'));

class AppConsoleFramePlugin {
  constructor (config = { appName, appVersion, target }) {
    this.config = config;
  }

  apply (compiler) {
    const { appName, appVersion, target } = this.config;
    const mode = this.capitalizeFirstChar(compiler.options.mode);
    const targetText = this.capitalizeFirstChar(target);
    const watch = this.capitalizeFirstChar(compiler.options.watch ? 'watch' : 'single run');

    const makeLogo = (compilation, callback) => {
      this.time = dayjs();
      this.clear();
      this.newLine();
      this.writeLogo(`${appName} Client v${appVersion}`, 44);
      this.newLine();
      this.write(`  ${mode} - ${targetText} - ${watch}`);
      this.newLine(2);
      callback();
    };

    if (compiler.options.watch) {
      compiler.hooks.watchRun.tapAsync(
        'AppLogoPlugin',
        makeLogo,
      );
    } else {
      compiler.hooks.beforeRun.tapAsync(
        'AppLogoPlugin',
        makeLogo,
      );
    }

    compiler.hooks.done.tapAsync(
      'AppLogoPlugin',
      (compilation, callback) => {
        callback();
        const time = Math.abs(dayjs(compilation.startTime).diff(compilation.endTime, 'second', true));

        process.stderr.cursorTo(0, 6, () => {
          this.write(chalk.green('  Done at ' + chalk.bold(dayjs().format('HH:mm:ss'))));
          this.newLine();
          this.write(chalk.green.bold('  Build completed in ' + time + 's'));
          this.newLine(2);
          setTimeout(() => {
            if (compiler.options.watch) {
              this.write('  Waiting for changes...');
            }
          }, 100);
        });
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

module.exports = AppConsoleFramePlugin;
