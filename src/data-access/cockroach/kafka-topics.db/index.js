const { Pool } = require("pg");
const cockroach = new Pool({
  host: "localhost",
  user: "sagar",
  database: "kafka_topics",
  password: "Rapid@456789",
  port: "26257",
  ssl: {
    rejectUnauthorized: false,
  },
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionsTimeoutMillis: 2000,
});
cockroach
  .connect()
  .then(() => console.log("COCKROACH kafka_topics databse connected"));

const makeTopicsDb = require("./topics.db");
const topicsDb = makeTopicsDb({ cockroach });

module.exports = { topicsDb };
