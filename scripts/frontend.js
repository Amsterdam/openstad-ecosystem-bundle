const fs = require('fs');
const util = require('util');
const frontendDb = require('mongodb').MongoClient;
const execute = require('./execute');

module.exports = function initFrontendServer(config) {

  console.log('------------------------------');
  console.log('Init frontend server');

  const mongohost = config.FRONTEND_DB_HOST;
  const mongoport = config.FRONTEND_DB_PORT || 27017;
  const mongourl = 'mongodb://' + mongohost + ':' + mongoport;

  return new Promise((resolve, reject) => {

    frontendDb.connect(mongourl, function(err, db) {

      if (err) {
        console.log('Frontend initialisatie error');
        console.log(err);
        process.exit();
      }

      return new Promise((resolve, reject) => {
        
        let frontendConfig = `
LOGIN_CSM_BASIC_AUTH_USER=${config.FRONTEND_LOGIN_CSM_BASIC_AUTH_USER};
LOGIN_CSM_BASIC_AUTH_PASSWORD=${config.FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD};
SAMPLE_DB=${config.FRONTEND_SAMPLE_DB};
DB_HOST=${config.FRONTEND_DB_HOST};
#DB_NAME=${config.FRONTEND_DB_NAME};
#DB_USER=${config.FRONTEND_DB_USER};
#DB_PASSWORD=${config.FRONTEND_DB_PASSWORD};
PORT=${config.FRONTEND_PORT};
PORT2=${config.FRONTEND_PORT2};
NODE_ENV=${config.FRONTEND_NODE_ENV};
DEFAULT_HOST=${config.FRONTEND_DEFAULT_HOST};
GOOGLE_MAPS_API_KEY=${config.FRONTEND_GOOGLE_MAPS_API_KEY};
DEFAULT_DB=${config.FRONTEND_DEFAULT_DB};
APP_URL=${config.FRONTEND_APP_URL};
API=${config.FRONTEND_API};
API_LOGOUT_URL=${config.FRONTEND_API_LOGOUT_URL};
IMAGE_API_URL=${config.FRONTEND_IMAGE_API_URL};
IMAGE_API_ACCESS_TOKEN=${config.FRONTEND_IMAGE_API_ACCESS_TOKEN};
SESSION_SECRET=${config.FRONTEND_SESSION_SECRET};
MINIFY_JS=${config.FRONTEND_MINIFY_JS};
APOS_WORKFLOW=${config.FRONTEND_APOS_WORKFLOW};
SITE_API_KEY=${config.FRONTEND_SITE_API_KEY};
INTERNAL_API_URL=${config.FRONTEND_INTERNAL_API_URL};
MAP_TYPE=${config.FRONTEND_MAP_TYPE};
`;

        console.log('Create config file');
        fs.writeFile('./openstad-frontend/.env', frontendConfig, function(err, data) {
          if (err) return reject();
          resolve();
        });

      })

      // npm i
        .then(() => {
          console.log('Exec npm i');
          return execute('npm', ['i'], { cwd: './openstad-frontend' });
        })
      
      // create admin user
//        .then(() => {
//          console.log('Create admin user');
//          return execute('node', ['app.js', 'apostrophe-users:add', 'admin', 'admin'], { cwd: './openstad-frontend' });
//        })


      // done
        .then(() => {
          return resolve();
        })

        .catch(err => {
          console.log('API initialisatie error');
          console.log(err);
          process.exit();
        })


    });
                       
  });

};
