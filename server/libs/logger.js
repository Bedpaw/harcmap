function log (message, data) {
  console.log(`### LOG ### ${message}`, data);
}

function error (message, data) {
  console.log(`### ERR ### ${message}`, data);
}

module.exports = {
  log,
  error,
};
