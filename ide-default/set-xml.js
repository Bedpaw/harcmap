const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const chalk = require('chalk');

async function setDefaultXML ({
  defaultXMLPath,
  targetXMLPath,
  validator = () => true,
  modifier = data => data,
}) {
  if (fs.existsSync(defaultXMLPath) === false) throw new Error(`File "${defaultXMLPath}" must exists.`);

  const defaultXMLString = fs.readFileSync(defaultXMLPath, 'utf-8');
  const targetXMLExists = fs.existsSync(targetXMLPath);
  const dirnameTarget = path.dirname(targetXMLPath);

  if (targetXMLExists === false) {
    fs.existsSync(dirnameTarget) === false && fs.mkdirSync(dirnameTarget, { recursive: true });
    fs.writeFileSync(targetXMLPath, defaultXMLString);
  }
  else {
    const targetXML = fs.readFileSync(targetXMLPath, 'utf-8');

    const targetJSON = await xml2js.parseStringPromise(targetXML);
    if (validator(targetJSON)) throw new Error(`File "${targetXMLPath}" has invalid structure or is corrupted.`);

    const modifiedTargetJSON = modifier(targetJSON);

    const builder = new xml2js.Builder();
    const newTargetXML = builder.buildObject(modifiedTargetJSON);

    fs.writeFileSync(targetXMLPath, newTargetXML);
  }

  console.log(chalk.green('    write ' + targetXMLPath));
}

module.exports = {
  setDefaultXML,
};
