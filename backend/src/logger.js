const fs = require('fs');

function initializeLogger() {
  //Do some initialization stuff
}

function getFilename() {
  let currentDate = new Date();
  return (
    './' +
    currentDate.getFullYear() +
    '-' +
    (currentDate.getMonth() + 1) +
    '-' +
    currentDate.getDate() +
    '-logs.txt'
  );
}

function getTime() {
  let currentDate = new Date();
  let seconds = currentDate.getSeconds();
  return (
    currentDate.getHours() +
    ':' +
    currentDate.getMinutes() +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds
  );
}

function writeToLogFile(message, level) {
  fs.appendFile(
    getFilename(),
    getTime() + ' - ' + level + ': ' + message + '\n',
    (err) => {
      if (err) console.err('Logging error encountered: ' + err);
    }
  );
}

function log(message) {
  console.log(message);

  writeToLogFile(message, 'LOG');
}

function warn(message) {
  console.warn(message);

  writeToLogFile(message, 'WARNING');
}

function error(message) {
  console.error(message);

  writeToLogFile(message, 'ERROR');
}

module.exports = { initializeLogger, log, warn, error };
