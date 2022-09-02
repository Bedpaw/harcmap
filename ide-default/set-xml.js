const fs = require('fs');
const parseStringPromise = require('xml2js').parseStringPromise;
const xml2js = require('xml2js');
const path = require('path');
const chalk = require('chalk');

function setDefaultXML ({
  defaultJSONPath,
  targetXMLPath,
  validator = () => true,
  modifier = data => data,
}) {
  if (fs.existsSync(defaultJSONPath) === false) throw new Error(`File "${defaultJSONPath}" must exists.`);

  const defaultJSON = JSON.parse(fs.readFileSync(defaultJSONPath, 'utf-8'));
  const targetXMLExists = fs.existsSync(targetXMLPath);
  const dirnameTarget = path.dirname(targetXMLPath);

  if (targetXMLExists === false) {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(defaultJSON);

    fs.existsSync(dirnameTarget) === false && fs.mkdirSync(dirnameTarget, { recursive: true });
    fs.writeFileSync(targetXMLPath, xml);
  }
  else {
    const targetXML = fs.readFileSync(targetXMLPath, 'utf-8');

    parseStringPromise(targetXML)
      .then(json => {
        if (validator(json)) throw new Error(`File "${targetXMLPath}" has invalid structure or is corrupted.`);

        json = modifier(json);

        const builder = new xml2js.Builder();
        const xml = builder.buildObject(json);

        fs.writeFileSync(targetXMLPath, xml);
      });
  }
  console.log(chalk.green('    write ' + targetXMLPath));
}

module.exports = {
  setDefaultXML,
};
