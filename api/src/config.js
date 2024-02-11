require("dotenv").config(); // Load .env file into process.env
const { str, url, port } = require("envalid");

// Define validation schema for environment variables
const env = require("envalid").cleanEnv(process.env, {
  ENVIRONMENT: str({ default: "development", choices: ["development", "test", "production", "staging"] }),
  MONGO_URL: url({ default: "mongodb://localhost:27017/api" }),
  PORT: port({ default: "8080" }),
  secret: str({ default: "not-so-secret" }),
  APP_URL: url({ default: "http://localhost:8082" }),
  GITHUB_TOKEN: str({ default: null }),
});

// Extract validated environment variables
const { ENVIRONMENT, MONGO_URL, PORT, secret, APP_URL, GITHUB_TOKEN } = env;

module.exports = {
  PORT,
  MONGO_URL,
  secret,
  APP_URL,
  ENVIRONMENT,
  GITHUB_TOKEN,
};
