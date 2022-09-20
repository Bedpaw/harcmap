const { initIntellijSettings } = require('@dbetka/wdk/lib/ide/init-intellij-settings');
const { defaultModifiers } = require('@dbetka/wdk/lib/ide/default-modifiers');
const { defaultValidators } = require('@dbetka/wdk/lib/ide/default-validators');

initIntellijSettings([
  {
    name: 'EsLint',
    defaultXMLPath: '../wdk/share/ide/init-intellij-settings/default/eslint.xml',
    targetXMLPath: './.idea/inspectionProfiles/Project_Default.xml',
    validator: defaultValidators.projectDefaultEslint(),
    modifier: defaultModifiers.projectDefaultEslint(),
    // replaceIfTargetInvalid: true,
  },
  {
    name: 'ESLint on save',
    defaultXMLPath: '../wdk/share/ide/init-intellij-settings/default/eslint-on-save.xml',
    targetXMLPath: './.idea/jsLinters/eslint.xml',
    validator: defaultValidators.eslintOnSave(),
    modifier: defaultModifiers.eslintOnSave({ enabled: 'true' }),
    // replaceIfTargetInvalid: true,
  },
  {
    name: 'Webpack',
    defaultXMLPath: '../wdk/share/ide/init-intellij-settings/default/misc.xml',
    targetXMLPath: './.idea/misc.xml',
    validator: defaultValidators.webpack(),
    modifier: defaultModifiers.webpack({ dir: '$PROJECT_DIR$/client/webpack/config.common.js' }),
    // replaceIfTargetInvalid: true,
  },
]);
