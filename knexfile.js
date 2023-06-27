const dotenv = require("dotenv");
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host:
        dotenv.config().parsed.DB_HOST || "containers-us-west-133.railway.app",
      user: dotenv.config().parsed.DB_USER || "root",
      password: dotenv.config().parsed.DB_PASSWORD || "7cUuXIEibz6roJNm7BNU",
      database: dotenv.config().parsed.DB_DATABASE || "railway",
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
      host: dotenv.config().parsed.DB_HOST,
      user: dotenv.config().parsed.DB_USER,
      password: dotenv.config().parsed.DB_PASSWORD,
      database: dotenv.config().parsed.DB_DATABASE,
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
      host: dotenv.config().parsed.DB_HOST,
      user: dotenv.config().parsed.DB_USER,
      password: dotenv.config().parsed.DB_PASSWORD,
      database: dotenv.config().parsed.DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
