const { setDefaultXML } = require('./set-xml');

async function setDefaultWebpack () {
  console.log('  Webpack');

  await setDefaultXML({
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
  });
}

module.exports = {
  setDefaultWebpack,
};
