const chalk = require('chalk');
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/duration'));
const { Table } = require('console-table-printer');
const ProgressBarPlugin = require('./progress-bar-plugin');

class AppConsoleFramePlugin {
  constructor (config = { appName, appVersion, target }) {
    const progressBarPlugin = new ProgressBarPlugin();

    this.config = config;
    this.config.progressBarPlugin = progressBarPlugin;

    if (typeof config.appName !== 'string') throw new Error('AppConsoleFramePlugin: `appName` should be string');
    if (typeof config.appVersion !== 'string') throw new Error('AppConsoleFramePlugin: `appVersion` should be string');
    if (typeof config.target !== 'string') throw new Error('AppConsoleFramePlugin: `target` should be string');

    return [
      this,
      progressBarPlugin.plugin,
    ];
  }

  stopProgressBarPlugin () {
    const plugin = this.config.progressBarPlugin;
    plugin && plugin.stop();
  }

  startProgressBarPlugin () {
    const plugin = this.config.progressBarPlugin;
    plugin && plugin.start();
  }

  apply (compiler) {
    const pluginName = AppConsoleFramePlugin.name;
    const { appName, appVersion, target } = this.config;
    const mode = this.capitalizeFirstChar(compiler.options.mode);
    const targetText = this.capitalizeFirstChar(target);
    const watch = this.capitalizeFirstChar(compiler.options.watch ? 'watch' : 'single run');

    const makeLogo = () => {
      this.time = dayjs();
      this.clear();
      this.newLine();
      this.writeLogo(`${appName} Client v${appVersion}`, 44);
      this.newLine();
      this.write(`  ${mode} - ${targetText} - ${watch}`);
      this.newLine(2);
      this.startProgressBarPlugin();
    };

    if (compiler.options.watch) {
      compiler.hooks.watchRun.tap(pluginName,
        makeLogo,
      );
    } else {
      compiler.hooks.beforeRun.tap(pluginName,
        makeLogo,
      );
    }

    compiler.hooks.done.tapAsync(pluginName,
      (stats, callback) => {
        if (stats.compilation.errors.length > 0 || stats.compilation.warnings.length > 0) {
          this.newLine(2);
          this.stopProgressBarPlugin();
          callback();
          return;
        }

        const time = Math.abs(dayjs(stats.startTime).diff(stats.endTime, 'second', true));

        process.stderr.cursorTo(0, 6, () => {
          this.writeAssetsSizes(stats);
          this.newLine();
          this.write(chalk.green('  Done at ' + chalk.bold(dayjs().format('HH:mm:ss'))));
          this.newLine();
          this.write(chalk.green.bold(`  Build completed in ${time}s`));
          this.newLine(2);
          setTimeout(() => {
            if (compiler.options.watch) {
              this.write('  Waiting for changes...');
            }
          }, 100);
        });
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
      chalk.reset.bgGreen.bold(
        ' '.repeat(oneSideLength) +
        text +
        ' '.repeat(oneSideLength),
      ),
    );
  }

  writeAssetsSizes (stats) {
    const table = new Table(this.tableConfig());
    const availableExt = ['js'];
    const isProductionMode = stats.compilation.compiler.options.mode === 'production';
    const maxAssetSize = stats.compilation.compiler.options.performance.maxAssetSize;

    for (const assetName in stats.compilation.assets) {
      const asset = stats.compilation.assets[assetName];
      const assetExt = assetName.split('.').pop();
      const assetSize = (Math.round(asset._size / 1024)) + ' KB';

      const firstAssetNamePart = assetName.split('.')[0];
      const secondAssetNamePart = assetName.split('.').splice(1).join('.');
      const styledAssetName = chalk.reset.bold(firstAssetNamePart) + chalk.gray('.' + secondAssetNamePart);

      const isOverSizeLimit = asset._size > maxAssetSize;
      const writeWithColor = chalk.bold[isOverSizeLimit && isProductionMode ? 'yellow' : 'green'];

      if (availableExt.includes(assetExt)) {
        table.addRow({ file: styledAssetName, size: writeWithColor(assetSize) });
      }
    }
    const tableWithoutHeader = table.render().split('\n').splice(3).join('\n');
    this.write(tableWithoutHeader);
  }

  write (text) {
    process.stderr.write(text);
  }

  newLine (number = 1) {
    process.stderr.write('\n'.repeat(number));
  }

  clear () {
    process.stdout.write('\x1Bc');
  }

  tableConfig () {
    return {
      columns: [{ name: 'file', alignment: 'left' }],
      style: {
        headerTop: {
          left: '',
          mid: '',
          right: '',
          other: '',
        },
        headerBottom: {
          left: '',
          mid: '',
          right: '',
          other: '',
        },
        tableBottom: {
          left: '',
          mid: '',
          right: '',
          other: '',
        },
        vertical: ' ',
        rowSeparator: {
          left: '',
          mid: '',
          right: '',
          other: '',
        },
      },
    };
  }
}

module.exports = AppConsoleFramePlugin;
