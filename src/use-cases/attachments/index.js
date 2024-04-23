const dbs = require("../../data-access").cockroach;
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const makeInsertAttachment = require("./insert-attachment");
const insertAttachment = makeInsertAttachment({
  client,
  google,
  fs,
  insertAttachmentIntoDb: dbs.attachments.insertAttachmentIntoDb,
  path,
});
module.exports = { insertAttachment };
