// herbruikbare waarden
let API_URL = process.env.API_URL || 'http://' + (process.env.API_DOMAIN || 'openstad-api.' + process.env.BASE_DOMAIN);
let API_FIXED_AUTH_KEY = process.env.API_FIXED_AUTH_KEY || generateRandomToken({ length: 2048 });
let API_FIXED_AUTH_TOKENS = process.env.API_FIXED_AUTH_TOKENS || [ {	"token": API_FIXED_AUTH_KEY, "userId": "2" } ];
let API_PORT = process.env.API_PORT || '31401';
let MIJNOPENSTAD_URL = process.env.MIJNOPENSTAD_URL || 'http://' + (process.env.MIJNOPENSTAD_DOMAIN || 'openstad-mijnopenstad.' + process.env.BASE_DOMAIN);
let MIJNOPENSTAD_JWT_SECRET = generateRandomToken({ length: 64 });
let MIJNOPENSTAD_CLIENT_ID = 'default-client';
let MIJNOPENSTAD_CLIENT_SECRET = generateRandomToken({ length: 64 });
let IMAGE_APP_URL = process.env.IMAGE_APP_URL || 'http://' + 'openstad-image.' + process.env.BASE_DOMAIN;
let IMAGE_CLIENT_TOKEN = process.env.IMAGE_CLIENT_TOKEN || generateRandomToken({ length: 512 });
let FRONTEND_DEFAULT_HOST = process.env.FRONTEND_DEFAULT_HOST || 'default.openstad-cms.' + process.env.BASE_DOMAIN;
let FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || 'http://' + FRONTEND_DEFAULT_HOST;

    // export config
module.exports = {

  // API
  API_DB_HOST: process.env.API_DB_HOST || process.env.DB_HOST,
  API_DB_USERNAME: process.env.API_DB_USERNAME || process.env.DB_USERNAME,
  API_DB_PASSWORD: process.env.API_DB_PASSWORD || process.env.DB_PASSWORD,
  API_DB_NAME: process.env.API_DB_NAME || ( process.env.DB_BASE_NAME ? process.env.DB_BASE_NAME + '-api' :  'openstad-api' ),
  API_DB_DIALECT: process.env.API_DB_DIALECT || process.env.DB_DIALECT || 'mariadb',

  API_URL: API_URL,
  API_DOMAIN: process.env.API_DOMAIN || 'openstad-api.' + process.env.BASE_DOMAIN,
  API_PORT: API_PORT,

  API_FROM_EMAIL_ADDRESS: process.env.API_FROM_EMAIL_ADDRESS || process.env.FROM_EMAIL_ADDRESS,
  API_SMTP_PORT: process.env.API_SMTP_PORT || process.env.SMTP_PORT,
  API_SMTP_HOST: process.env.API_SMTP_HOST || process.env.SMTP_HOST,
  API_SMTP_USERNAME: process.env.API_SMTP_USERNAME || process.env.SMTP_USERNAME,
  API_SMTP_PASSWORD: process.env.API_SMTP_PASSWORD || process.env.SMTP_PASSWORD,

  API_COOKIE_SECRET: process.env.API_COOKIE_SECRET || generateRandomToken({ length: 32 }),
  API_COOKIE_ONLY_SECURE: process.env.API_COOKIE_ONLY_SECURE || process.env.API_COOKIE_ONLY_SECURE != 'false' ? true : false,

  API_MIJNOPENSTAD_URL: process.env.API_MIJNOPENSTAD_URL || MIJNOPENSTAD_URL,
  API_MIJNOPENSTAD_JWT_SECRET: process.env.API_MIJNOPENSTAD_JWT_SECRET || MIJNOPENSTAD_JWT_SECRET,
  API_MIJNOPENSTAD_DEFAULT_CLIENT_ID: process.env.API_MIJNOPENSTAD_DEFAULT_CLIENT_ID || MIJNOPENSTAD_CLIENT_ID,
  API_MIJNOPENSTAD_CLIENT_PASSWORD: process.env.API_MIJNOPENSTAD_CLIENT_PASSWORD || MIJNOPENSTAD_CLIENT_SECRET,
  API_FIXED_AUTH_TOKENS: process.env.API_FIXED_AUTH_TOKENS || [ {	"token": generateRandomToken({ length: 1024 }), "userId": "2" } ],

  // image server
  IMAGE_DB_HOST: process.env.IMAGE_DB_HOST || process.env.DB_HOST,
  IMAGE_DB_USERNAME: process.env.IMAGE_DB_USERNAME || process.env.DB_USERNAME,
  IMAGE_DB_PASSWORD: process.env.IMAGE_DB_PASSWORD || process.env.DB_PASSWORD,
  IMAGE_DB_NAME: process.env.IMAGE_DB_NAME || ( process.env.DB_BASE_NAME ? process.env.DB_BASE_NAME + '-image' :  'openstad-image' ),

  IMAGE_APP_URL: IMAGE_APP_URL,
	IMAGE_PORT_API: process.env.IMAGE_PORT_API || 31402,
	IMAGE_PORT_IMAGE_SERVER: process.env.IMAGE_PORT_IMAGE_SERVER || 31403,

	IMAGE_IMAGES_DIR: process.env.IMAGE_IMAGES_DIR || '',
	IMAGE_THROTTLE: process.env.IMAGE_THROTTLE || true,
  IMAGE_THROTTLE_CC_PROCESSORS: process.env.IMAGE_THROTTLE_CC_PROCESSORS || 4,
  IMAGE_THROTTLE_CC_PREFETCHER: process.env.IMAGE_THROTTLE_CC_PREFETCHER || 20,
  IMAGE_THROTTLE_CC_REQUESTS: process.env.IMAGE_THROTTLE_CC_REQUESTS || 100,

  IMAGE_CLIENT_NAME: process.env.IMAGE_CLIENT_NAME || 'default-client',
  IMAGE_CLIENT_TOKEN: IMAGE_CLIENT_TOKEN,
  IMAGE_CLIENT_DISPLAY_NAME: process.env.IMAGE_CLIENT_DISPLAY_NAME || 'Default image server client',

  // frontend
  FRONTEND_LOGIN_CSM_BASIC_AUTH_USER: process.env.FRONTEND_LOGIN_CSM_BASIC_AUTH_USER || process.env.BASIC_AUTH_USER || 'openstad',
  FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD: process.env.FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD || process.env.BASIC_AUTH_PASSWORD || '12345',
  FRONTEND_SAMPLE_DB: process.env.FRONTEND_SAMPLE_DB || 'sampledb',
  FRONTEND_DB_HOST: process.env.FRONTEND_DB_HOST || process.env.DB_HOST,
  FRONTEND_DB_PORT: process.env.FRONTEND_DB_PORT || undefined,
  //FRONTEND_DB_NAME: process.env.FRONTEND_DB_NAME || 'cms-default',
  //FRONTEND_DB_USER: process.env.FRONTEND_DB_USER || 'cms',
  //FRONTEND_DB_PASSWORD: process.env.FRONTEND_DB_PASSWORD || 'okVfJfl0kPSOf0kjQcRS',
  FRONTEND_PORT: process.env.FRONTEND_PORT || '31403',
  FRONTEND_PORT2: process.env.FRONTEND_PORT2 || '31404',
  FRONTEND_NODE_ENV: process.env.FRONTEND_NODE_ENV || 'development',
  FRONTEND_DEFAULT_HOST: process.env.FRONTEND_DEFAULT_HOST || FRONTEND_DEFAULT_HOST,
  FRONTEND_GOOGLE_MAPS_API_KEY: process.env.FRONTEND_GOOGLE_MAPS_API_KEY || undefined,
  FRONTEND_DEFAULT_DB: process.env.FRONTEND_DEFAULT_DB || 'localhost',
  FRONTEND_APP_URL: process.env.FRONTEND_APP_URL || FRONTEND_APP_URL,
  FRONTEND_API: process.env.FRONTEND_API || API_URL,
  FRONTEND_API_LOGOUT_URL: process.env.FRONTEND_API_LOGOUT_URL || MIJNOPENSTAD_URL + '/logout?clientId=' + MIJNOPENSTAD_CLIENT_ID,
  FRONTEND_IMAGE_API_URL: process.env.FRONTEND_IMAGE_API_URL || IMAGE_APP_URL,
  FRONTEND_IMAGE_API_ACCESS_TOKEN: process.env.FRONTEND_IMAGE_API_ACCESS_TOKEN || IMAGE_CLIENT_TOKEN,
  FRONTEND_SESSION_SECRET: process.env.FRONTEND_SESSION_SECRET || generateRandomToken({ length: 32 }),
  FRONTEND_MINIFY_JS: process.env.FRONTEND_MINIFY_JS || 'OFF',
  FRONTEND_APOS_WORKFLOW: process.env.FRONTEND_APOS_WORKFLOW || 'ON',
  FRONTEND_SITE_API_KEY: process.env.FRONTEND_SITE_API_KEY || API_FIXED_AUTH_KEY,
  FRONTEND_INTERNAL_API_URL: process.env.FRONTEND_INTERNAL_API_URL || "http://localhost:" + API_PORT,
  FRONTEND_MAP_TYPE: process.env.FRONTEND_MAP_TYPE || 'googlemaps',
  
}

function generateRandomToken(params) {

  var token = '';

  params.chars = params.chars || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  params.length = params.length || 25;

  for (let i = 0; i < params.length; i++) {
    const rnd = Math.floor(params.chars.length * Math.random());
    const chr = params.chars.substring(rnd, rnd + 1);
    token = token + chr;
  }

  return token;

}

