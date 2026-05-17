#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to .env file
const envPath = path.resolve(process.cwd(), '.env');

// Check if .env file exists, create it if it doesn't
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, '');
}

// Load current environment variables
const envConfig = dotenv.parse(fs.readFileSync(envPath) || '');

// Check if ENABLE_LOGS exists, if not, assume it's disabled
if (envConfig.ENABLE_LOGS === undefined) {
  console.log('ENABLE_LOGS not found in .env file. Assuming logging is currently disabled.');
  envConfig.ENABLE_LOGS = 'false';
}

// Toggle ENABLE_LOGS
const currentValue = envConfig.ENABLE_LOGS === 'true';
envConfig.ENABLE_LOGS = (!currentValue).toString();

// Write updated environment variables back to .env file
const newEnvContent = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(envPath, newEnvContent);

// Provide clear feedback about the current state
console.log(`Logging is now ${envConfig.ENABLE_LOGS === 'true' ? 'ENABLED' : 'DISABLED'}`);
console.log(`To manually control logging, set ENABLE_LOGS=true or ENABLE_LOGS=false in your .env file`);
console.log(`Or use: npm run logs:on or npm run logs:off`); 