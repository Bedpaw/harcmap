const path = require('path');
const fs = require('fs');

function resolve (dir) {
  return path.resolve(path.join(__dirname, '..'), dir);
}

function getAppVersionFromPackageJSON (filePath = '../package.json') {
  const rawData = fs.readFileSync(filePath);
  if (rawData) {
    const packageJSON = JSON.parse(rawData);
    if (packageJSON) {
      return packageJSON.version;
    }
    throw new Error('Error: package.json file is not JSON format');
  }
  throw new Error('Error: package.json file is unreachable');
}

module.exports = {
  resolve,
  getAppVersionFromPackageJSON,
};
