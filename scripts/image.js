const fs = require('fs');
const util = require('util');
const imgDb = require('mysql-promise')('img');
const execute = require('./execute');

module.exports = function initImageServer(config) {

  console.log('------------------------------');
  console.log('Init image server');

  imgDb.configure({
    host     : config.IMAGE_DB_HOST,
    user     : config.IMAGE_DB_USERNAME,
    password : config.IMAGE_DB_PASSWORD,
    database : config.IMAGE_DB_NAME,
  });

  let doCreateDB = false;

  return imgDb.query('SHOW TABLES;')

  // check db connection
    .then(result => {
      let rows = result[0];
      if (rows && rows.length) {
        console.log('Image server database seems to be initialized already');
      } else {
        doCreateDB = true;
      }
    })

  // create local config
    .then(() => {

      let imgConfig = `
DB_HOST=${config.IMAGE_DB_HOST}
DB_USER=${config.IMAGE_DB_USERNAME}
DB_PASSWORD=${config.IMAGE_DB_PASSWORD}
DB_NAME=${config.IMAGE_DB_NAME}

APP_URL=${config.IMAGE_APP_URL}
PORT_API=${config.IMAGE_PORT_API}
PORT_IMAGE_SERVER=${config.IMAGE_PORT_IMAGE_SERVER}

IMAGES_DIR=${config.IMAGE_IMAGES_DIR}
THROTTLE=${config.IMAGE_THROTTLE}
THROTTLE_CC_PROCESSORS=${config.IMAGE_THROTTLE_CC_PROCESSORS}
THROTTLE_CC_PREFETCHER=${config.IMAGE_THROTTLE_CC_PREFETCHER}
THROTTLE_CC_REQUESTS=${config.IMAGE_THROTTLE_CC_REQUESTS}
`

      console.log('Create config file');
      fs.writeFileSync('./openstad-image-server/.env', imgConfig);

    })

  // npm i
    .then(() => {
      console.log('Exec npm i');
      return execute('npm', ['i'], { cwd: './openstad-image-server' });
    })
 
  // npm i knex
    .then(() => {
      console.log('Exec npm i knex');
      return execute('npm', ['i', 'knex'], { cwd: './openstad-image-server' });
    })
 
  // init db
    .then(() => {
 
      if (doCreateDB) {
        console.log('Create database');
        return execute('knex', ['migrate:latest'], { cwd: './openstad-image-server' });
        
      }
 
    })

  // create client
    .then(() => {

      return imgDb.query('SELECT * FROM clients;')
        .then(result => {
          let rows = result[0];
          if (rows && rows.length) {
            console.log('A client already exists');
          } else {
            return true;
          }
        })
        .then(doCreateClient => {
          if (doCreateClient) {
            console.log('Create client');
            return imgDb.query(`INSERT INTO clients VALUES( 1, '${config.IMAGE_CLIENT_NAME}', '${config.IMAGE_CLIENT_TOKEN}', '${config.IMAGE_CLIENT_DISPLAY_NAME}', NOW(), NOW() );`)
          }
        })

    })
  
    .catch(err => {
      console.log('API initialisatie error');
      console.log(err);
      process.exit();
    })
}
