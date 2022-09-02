const { setDefaultXML } = require('./set-xml');

async function setDefaultESLint () {
  console.log('  ESLint');

  await setDefaultXML({
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
  });
}

module.exports = {
  setDefaultESLint,
};
