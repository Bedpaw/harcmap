const { initIntellijSettings, XMLUtils } = require('../../wdk/lib/ide/init-intellij-settings');

const getByName = XMLUtils.getByName;
const modifyValueByName = XMLUtils.modifyValueByName;
const modifyAttr = XMLUtils.modifyAttr;

initIntellijSettings([
  {
    name: 'EsLint',
    defaultXMLPath: '../wdk/share/ide/init-intellij-settings/default/eslint.xml',
    targetXMLPath: './.idea/inspectionProfiles/Project_Default.xml',
    validator: json => {
      if (json.component === undefined) return true;

      const profile = json.component.profile[0];

      return profile === undefined ||
        profile.inspection_tool[0] === undefined;
    },
    modifier: json => {
      const profile = json.component.profile[0];
      const inspectionTool = profile.inspection_tool[0];

      modifyAttr(inspectionTool, 'class', 'Eslint');
      modifyAttr(inspectionTool, 'enabled', 'true');
      modifyAttr(inspectionTool, 'level', 'WARNING');
      modifyAttr(inspectionTool, 'enabled_by_default', 'true');

      return json;
    },
  },
  {
    name: 'ESLint on save',
    defaultXMLPath: '../wdk/share/ide/init-intellij-settings/default/eslint-on-save.xml',
    targetXMLPath: './.idea/jsLinters/eslint.xml',
    validator: json =>
      json.project === undefined ||
      json.project.component === undefined ||
      Array.isArray(getByName(json.project.component, 'EslintConfiguration').option) === false,
    modifier: json => {
      const component = getByName(json.project.component, 'EslintConfiguration');
      modifyValueByName(component.option, 'fix-on-save', 'true');

      return json;
    },
  },
  {
    name: 'Webpack',
    defaultXMLPath: '../wdk/share/ide/init-intellij-settings/default/misc.xml',
    targetXMLPath: './.idea/misc.xml',
    validator: json =>
      json.project === undefined ||
      json.project.component === undefined ||
      Array.isArray(getByName(json.project.component, 'WebPackConfiguration').option) === false,
    modifier: json => {
      const component = getByName(json.project.component, 'WebPackConfiguration');
      modifyValueByName(component.option, 'mode', 'MANUAL');
      modifyValueByName(component.option, 'path', '$PROJECT_DIR$/client/webpack/config.common.js');

      return json;
    },
  },
]);
