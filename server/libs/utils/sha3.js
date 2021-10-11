const { SHA3 } = require('sha3');

/**
 * @description Generate SHA3-512 from given string
 * @param text {string}
 * @return {string}
 */
function getSHA (text) {
  const hash = new SHA3(512);
  hash.update(text);
  return hash.digest('hex');
}

module.exports = getSHA;
