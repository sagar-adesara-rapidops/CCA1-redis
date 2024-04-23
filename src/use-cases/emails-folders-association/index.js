const dbs = require("../../data-access").cockroach;
// const { OAuth2Client } = require("google-auth-library");
// const { google } = require("googleapis");

// const CLIENT_ID = "";
// const CLIENT_SECRET = "";
// const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

// const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const makeInsertFolderAssociation = require("./insert-folder-association");
const insertFolderAssociation = makeInsertFolderAssociation({
  insertFolderAssociationIntoDb:
    dbs.emailsFoldersAssociationDb.insertFolderAssociationIntoDb,
});

module.exports = { insertFolderAssociation };
