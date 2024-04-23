const { Pool } = require("pg");
const cockroach = new Pool({
  host: "localhost",
  user: "sagar",
  database: "email_client_cockroach1",
  password: "Rapid@456789",
  port: "26257",
  ssl: {
    rejectUnauthorized: false,
  },
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionsTimeoutMillis: 2000,
});
cockroach.connect().then(() => console.log("COCKROACH databse connected"));

// import { createClient } from "redis";
// async function redisConnection() {
const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

// await client.connect();
(async () => {
  await client.connect((err, data) => {
    console.log("Redis Server Error", err);
  });
})();

console.log("redis connection done");
// return client;
// }
// const client = (async () => redisConnection())();
// const client = redisConnection();
// const res = await cockroach.query("SELECT $1::text as message", [
//   "Hello world!",
// ]);
// console.log(res.rows[0].message); // Hello world!
// await cockroach.end();

const makeUsersDb = require("./users.db");
const usersDb = makeUsersDb({ cockroach });

const makeFoldersDb = require("./folders.db");
const foldersDb = makeFoldersDb({ cockroach });

const makeEmailsDb = require("./emails.db");
const emailsDb = makeEmailsDb({ cockroach });

const makeRecipientsDb = require("./recipients.db");
const recipients = makeRecipientsDb({ cockroach });

const makeAttachmentsDb = require("./attachments.db");
const attachments = makeAttachmentsDb({ cockroach });

const makeEmailsFoldersAssociationDb = require("./emails-folders-association.db");
const emailsFoldersAssociationDb = makeEmailsFoldersAssociationDb({
  cockroach,
});

const makeRedisStore = require("./redis.store");
const redisStore = makeRedisStore({ client });

const kafkaTopicsDb = require("./kafka-topics.db");

const cockroachdb = {
  usersDb,
  foldersDb,
  emailsDb,
  recipients,
  attachments,
  emailsFoldersAssociationDb,
  redisStore,
  kafkaTopicsDb,
};
module.exports = cockroachdb;
