const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { TARGETS } = require('./enums');

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

function isMobile (target) {
  return target === TARGETS.mobileApp;
}

function runInShell (command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error.message);
      if (stderr) return reject(stderr);

      resolve(stdout);
    });
  });
}

module.exports = {
  resolve,
  getAppVersionFromPackageJSON,
  runInShell,
  isMobile,
};
