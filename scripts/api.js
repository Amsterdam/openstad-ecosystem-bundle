const fs = require('fs');
const util = require('util');
const apiDb = require('mysql-promise')('api');
const execute = require('./execute');

module.exports = function initApi(config) {

  console.log('------------------------------');
  console.log('Init API');

  apiDb.configure({
    host     : config.API_DB_HOST,
    user     : config.API_DB_USERNAME,
    password : config.API_DB_PASSWORD,
    database : config.API_DB_NAME,
    dialect  : config.API_DB_DIALECT,
  });

  let doCreateDB = false;

  return apiDb.query('SHOW TABLES;')

  // check db connection
    .then(result => {
      let rows = result[0];
      if (rows && rows.length) {
        console.log('API database seems to be initialized already');
      } else {
        doCreateDB = true;
      }
    })

  // create local config
    .then(() => {

      let apiConfig = {

        "url": config.API_URL,
        "hostname": config.API_DOMAIN,

        "database": {
          host     : config.API_DB_HOST,
          user     : config.API_DB_USERNAME,
          password : config.API_DB_PASSWORD,
          database : config.API_DB_NAME,
          dialect  : config.API_DB_DIALECT,
          "multipleStatements": true
        },

        "express": {
          "port": config.API_PORT,
        },

        "mail": {
          "from": config.API_FROM_EMAIL_ADDRESS,
          "transport": {
            "smtp": {
              "port": config.API_SMTP_PORT,
              "host": config.API_SMTP_HOST,
              "auth": {
                "user": config.API_SMTP_USERNAME,
                "pass": config.API_SMTP_PASSWORD,
              }
            }
          }
        },

        "security": {
          "sessions": {
            "secret": config.API_COOKIE_SECRET,
            "onlySecure": config.API_API_COOKIE_ONLY_SECURE,
          }
        },

        "authorization": {
          "jwt-secret": config.API_MIJNOPENSTAD_JWT_SECRET,
          "auth-server-url": config.API_MIJNOPENSTAD_URL,
          "auth-client-id": config.API_MIJNOPENSTAD_DEFAULT_CLIENT_ID,
          "auth-client-secret": config.API_MIJNOPENSTAD__CLIENT_PASSWORD,
          "auth-server-login-path": "/dialog/authorize?redirect_uri=[[redirectUrl]]&response_type=code&client_id=[[clientId]]&scope=offline",
          "auth-server-exchange-code-path": "/oauth/token",
          "auth-server-get-user-path": "/api/userinfo?client_id=[[clientId]]",
          "auth-server-logout-path": "/logout?clientId=[[clientId]]",
          "after-login-redirect-uri": "/?jwt=[[jwt]]",
          "fixed-auth-tokens": config.API_FIXED_AUTH_TOKENS
        }
      }

      console.log('Create config file');
      fs.writeFileSync('./openstad-api/config/local.js', 'module.exports = ' + JSON.stringify(apiConfig, null, 2) );

    })

  // npm i
    .then(() => {
      console.log('Exec npm i');
      return execute('npm', ['i'], { cwd: './openstad-api' });
    })

  // init db
    .then(() => {
      if (doCreateDB) {
        console.log('Create database');
        return execute('node', ['reset.js'], { cwd: './openstad-api' });
      }
    })
  
    .catch(err => {
      console.log('API initialisatie error');
      console.log(err);
      process.exit();
    })
}
