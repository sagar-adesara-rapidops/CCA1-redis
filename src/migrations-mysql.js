const { Sequelize } = require("sequelize");
const path = require("path");
const { Umzug, SequelizeStorage, ApplyMigrationsAction } = require("umzug");
const sequelize = new Sequelize("email_client6", "sagar", "Rapid@456789", {
  host: "127.0.0.1",
  dialect: "mysql",
});
const umzug = new Umzug({
  migrations: { glob: path.join(__dirname, "./migrations/*.js") },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => await umzug.up())();
