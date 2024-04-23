// const { Sequelize } = require("sequelize");
"use strict";
const { Sequelize } = require("sequelize-cockroachdb");
// const fs = require("fs");
const { Umzug, SequelizeStorage, ApplyMigrationsAction } = require("umzug");
const path = require("path");
// const sequelize = new Sequelize("email_client5", "sagar", "Rapid@456789", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

const sequelize = new Sequelize({
  username: "sagar",
  password: "Rapid@456789",
  database: "email_client_cockroach1",
  dialect: "postgres",
  host: "localhost",
  port: "26257",
  dialectOptions: {
    // Your pg options here
    ssl: {
      rejectUnauthorized: false,
      // ca: fs
      //   .readFileSync("/home/ad.rapidops.com/sagar.adesara/certs/ca.crt")
      //   .toString(),
      // key: fs
      //   .readFileSync(
      //     "/home/ad.rapidops.com/sagar.adesara/certs/client.root.key"
      //   )
      //   .toString(),
      // cert: fs
      //   .readFileSync(
      //     "/home/ad.rapidops.com/sagar.adesara/certs/client.root.crt"
      //   )
      //   .toString(),
    },
  },
});
// sequelize.sync({ force: false });
// const DATABASE_URL =
//   "postgresql://<max>@<localhost>:<26257>/<email_client_cockroach1>?sslmode=verify-full&sslrootcert=</home/ad.rapidops.com/sagar.adesara/certs/ca.crt>&sslcert=</home/ad.rapidops.com/sagar.adesara/certs/client.root.key>&sslkey=</home/ad.rapidops.com/sagar.adesara/my-safe-directory/ca.key>";
// const Sequelize = require("sequelize-cockroachdb");

// const connectionString = DATABASE_URL;
// const sequelize = new Sequelize(connectionString);

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, "./migrations-cockroach/*.js"),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => await umzug.up().then(console.log("migration run...")))();
