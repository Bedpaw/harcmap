const { initIntellijSettings } = require('@dbetka/wdk/lib/ide/init-intellij-settings');
const { defaultModifiers } = require('@dbetka/wdk/lib/ide/default-modifiers');
const { defaultValidators } = require('@dbetka/wdk/lib/ide/default-validators');

initIntellijSettings([
  {
    name: 'Code style config',
    defaultXMLPath: './idea-default/code-styles/config.xml',
    targetXMLPath: './.idea/codeStyles/codeStyleConfig.xml',
    replaceIfExists: true,
  },
  {
    name: 'Code style scheme',
    defaultXMLPath: './idea-default/code-styles/scheme.xml',
    targetXMLPath: './.idea/codeStyles/Project.xml',
    replaceIfExists: true,
  },
  {
    name: 'EsLint',
    defaultXMLPath: './node_modules/@dbetka/wdk/share/ide/init-intellij-settings/default/eslint.xml',
    targetXMLPath: './.idea/inspectionProfiles/Project_Default.xml',
    validator: defaultValidators.projectDefaultEslint(),
    modifier: defaultModifiers.projectDefaultEslint(),
    // replaceIfTargetInvalid: true,
  },
  {
    name: 'ESLint on save',
    defaultXMLPath: './node_modules/@dbetka/wdk/share/ide/init-intellij-settings/default/eslint-on-save.xml',
    targetXMLPath: './.idea/jsLinters/eslint.xml',
    validator: defaultValidators.eslintOnSave(),
    modifier: defaultModifiers.eslintOnSave({ enabled: 'true' }),
    // replaceIfTargetInvalid: true,
  },
  {
    name: 'Webpack',
    defaultXMLPath: './node_modules/@dbetka/wdk/share/ide/init-intellij-settings/default/misc.xml',
    targetXMLPath: './.idea/misc.xml',
    validator: defaultValidators.webpack(),
    modifier: defaultModifiers.webpack({ dir: '$PROJECT_DIR$/client/webpack/config.common.js' }),
    // replaceIfTargetInvalid: true,
  },
]);
