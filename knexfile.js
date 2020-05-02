// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/lessons.db3",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  pool: {
    afterCreate: (conn, done) => {
      // runs after a connection is made to the sqlite engine
      conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
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
    client: "pg",
    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
