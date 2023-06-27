const dotenv = require("dotenv");
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || dotenv.config().parsed.DB_HOST,
      user: process.env.DB_USER || dotenv.config().parsed.DB_USER,
      password: process.env.DB_PASSWORD || dotenv.config().parsed.DB_PASSWORD,
      database: process.env.DB_DATABASE || dotenv.config().parsed.DB_DATABASE,
    },
    migrations: {
      directory: "./src/app/database/migrations",
    },
    seeds: {
      directory: "./src/app/database/seeder",
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || dotenv.config().parsed.DB_HOST,
      user: process.env.DB_USER || dotenv.config().parsed.DB_USER,
      password: process.env.DB_PASSWORD || dotenv.config().parsed.DB_PASSWORD,
      database: process.env.DB_DATABASE || dotenv.config().parsed.DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || dotenv.config().parsed.DB_HOST,
      user: process.env.DB_USER || dotenv.config().parsed.DB_USER,
      password: process.env.DB_PASSWORD || dotenv.config().parsed.DB_PASSWORD,
      database: process.env.DB_DATABASE || dotenv.config().parsed.DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/app/database/migrations",
      tableName: "knex_migrations",
    },
  },
};
