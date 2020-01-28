require('dotenv').config();
const config = require('./config');
const initApi = require('./api');
const initImageServer = require('./image');
const initFrontend = require('./frontend');

let modules = [
  initApi,
  initImageServer,
  initFrontend,
  function() {
    return new Promise((resolve, reject) => {
      console.log('Done');
      process.exit();
      resolve();
    })
  }
];

async function init() {
  for (let i = 0; i < modules.length; i++) {
    await modules[i](config);
  }
}

init();
