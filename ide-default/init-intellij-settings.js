const { initIntellijSettings } = require('@dbetka/wdk/lib/ide/init-intellij-settings');

initIntellijSettings([
  {
    name: 'ESLint',
    defaultXMLPath: './ide-default/default-eslint.xml',
    targetXMLPath: './.idea/jsLinters/eslint.xml',
    validator: json =>
      json === null ||
      json.project === undefined ||
      json.project.component === undefined ||
      Array.isArray(json.project.component[0].option) === false,
    modifier: json => {
      const option = json.project.component[0].option;

      option.find(({ $: { name } }) => name === 'fix-on-save').$.value = 'true';

      return json;
    },
  },
  {
    name: 'Webpack',
    defaultXMLPath: './ide-default/default-misc.xml',
    targetXMLPath: './.idea/misc.xml',
    validator: json =>
      json === null ||
      json.project === undefined ||
      json.project.component === undefined ||
      Array.isArray(json.project.component[0].option) === false,
    modifier: json => {
      const option = json.project.component[0].option;

      option.find(({ $: { name } }) => name === 'mode').$.value = 'MANUAL';
      option.find(({ $: { name } }) => name === 'path').$.value = '$PROJECT_DIR$/client/webpack/config.common.js';

      return json;
    },
  },
]);
