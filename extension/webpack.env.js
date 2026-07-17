const path = require("path");
const dotenv = require("dotenv");

const REQUIRED_ENV_VARS = ["INDEXER_URL", "INDEXER_V2_URL"];

const loadBuildEnv = ({ production = false } = {}) => {
  const envFile = path.resolve(
    __dirname,
    production ? ".env.production" : ".env.development",
  );

  dotenv.config({ path: envFile });

  if (!process.env.CI) {
    const missingVars = REQUIRED_ENV_VARS.filter(
      (varName) => !process.env[varName],
    );

    if (missingVars.length > 0) {
      console.error(
        "\n\x1b[31m%s\x1b[0m",
        "ERROR: Missing required environment variables:",
      );
      missingVars.forEach((varName) => {
        console.error(`  - ${varName}`);
      });
      console.error(`\nPlease configure the variables in ${envFile}:`);
      console.error("  INDEXER_URL=<backend-url>");
      console.error("  INDEXER_V2_URL=<backend-v2-url>");
      console.error("\nSee extension/README.md for configuration details.\n");
      process.exit(1);
    }
  }

  return envFile;
};

module.exports = { loadBuildEnv };
