function initializeLogger() {
  //Do some initialization stuff
}

async function log(message) {
  console.log(message);

  //Write log to file
}

async function warn(message) {
  console.warn(message);

  //Write warning to file
}

async function error(message) {
  console.error(message);

  //Write error to file
}

module.exports = { initializeLogger, log, warn, error };
