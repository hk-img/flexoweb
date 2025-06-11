const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from the .env file
const env = dotenv.config().parsed;

// Log the env object to check if `WEB_DOMAIN` is correctly loaded
console.log(env);

// Define the `environment` object with the new webDomain variable
const environmentContent = `
export const environment = {
  production: ${env.PRODUCTION === 'true'},
  apiUrl: "${env.API_URL}",
  s3_bucket_path: "${env.S3_BUCKET_PATH}",
  mapKey: "${env.MAP_KEY}",
  webDomain: "${env.WEB_DOMAIN || ''}",
  clientId: "${env.GOOGLE_CLIENT_ID}",
  HOST_WEBLINK: "${env.HOST_WEBLINK}"
};
`;

// Write the generated environment.ts file
fs.writeFileSync('./src/environments/environment.ts', environmentContent.trim());
