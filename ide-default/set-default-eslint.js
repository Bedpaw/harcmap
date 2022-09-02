const { setDefaultXML } = require('./set-xml');

console.log('  ESLint');

setDefaultXML({
  defaultJSONPath: './ide-default/default-eslint.json',
  targetXMLPath: './.idea/jsLinters/eslint.xml',
  validator: json =>
    json === null ||
    json.project === undefined ||
    json.project.component === undefined ||
    Array.isArray(json.project.component[0].option) === false,
  modifier: json => {
    const option = json.project.component[0].option;

    option.find(({ $ }) => $.name === 'fix-on-save').$.value = 'true';

    return json;
  },
});
