const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "sagar",
  // database: "email_client",
  password: "Rapid@456789",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("databse connected");
  }
});
const mysql = connection.promise();

////////////////////////////
const cockroach = require("./cockroach");

const makeUsersDb = require("./users.db");
const usersDb = makeUsersDb({ mysql });

const makeFoldersDb = require("./folders.db");
const foldersDb = makeFoldersDb({ mysql });

const dbs = {
  usersDb,
  foldersDb,
};
module.exports = { cockroach, mysql, ...dbs };
