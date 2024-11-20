const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from the .env file
const env = dotenv.config().parsed;

// Define the `environment` object
const environmentContent = `
export const environment = {
  production: ${env.PRODUCTION === 'true'},
  apiUrl: "${env.API_URL}",
  s3_bucket_path: "${env.S3_BUCKET_PATH}",
  mapKey: "${env.MAP_KEY}"
};
`;

// Write the generated environment.ts file
fs.writeFileSync('./src/environments/environment.ts', environmentContent.trim());

