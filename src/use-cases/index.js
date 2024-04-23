// const dbs = require("../data-access");
// const makeUsersUseCases = require("./users-use-cases");
// const usersUseCases = makeUsersUseCases({ usersDb: dbs.usersDb });

// const makeFoldersUseCases = require("./folders-use-cases");
// const foldersUseCases = makeFoldersUseCases({ foldersDb: dbs.foldersDb });

// module.exports = { usersUseCases, foldersUseCases };

const users = require("./users");
const folders = require("./folders");
const kafka = require("./kafka");
const emails = require("./emails");
const recipients = require("./recipients");
const attachments = require("./attachments");
const emailsFoldersAssociation = require("./emails-folders-association");

module.exports = {
  users,
  folders,
  kafka,
  emails,
  recipients,
  attachments,
  emailsFoldersAssociation,
};
