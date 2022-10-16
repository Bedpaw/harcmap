const { initIntellijSettings } = require('@dbetka/wdk/lib/ide/init-intellij-settings');
const { defaultConfigs } = require('@dbetka/wdk/lib/ide/defaults');

initIntellijSettings(defaultConfigs({
  codeStylesSchemePath: './idea-default/code-styles-scheme.xml',
  webpackPath: '$PROJECT_DIR$/client/webpack/config.common.js',
}));
