const { setDefaultXML } = require('./set-xml');

console.log('  Webpack');

setDefaultXML({
  defaultJSONPath: './ide-default/default-misc.json',
  targetXMLPath: './.idea/misc.xml',
  validator: json =>
    json === null ||
    json.project === undefined ||
    json.project.component === undefined ||
    Array.isArray(json.project.component[0].option) === false,
  modifier: json => {
    const option = json.project.component[0].option;

    option.find(({ $ }) => $.name === 'mode').$.value = 'MANUAL';
    option.find(({ $ }) => $.name === 'path').$.value = '$PROJECT_DIR$/client/webpack/config.common.js';

    return json;
  },
});
