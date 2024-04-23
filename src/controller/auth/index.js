const makeAuthAction = require("./auth.js");
const useCases = require("../../use-cases");

const { users, folders } = require("../../use-cases");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const CLIENT_ID ="";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// const makeUserFolders = require("./fetch-folder");
// const userFolders = makeUserFolders({
//   client,
//   google,
//   createFolder: folders.createFolder,
// });

const makeEmailSendAction = require("./email-send");
const emailSendAction = makeEmailSendAction({
  kafkaProducer: useCases.kafka.kafkaProducer,
});
const authAction = makeAuthAction({ users, client });

module.exports = {
  authAction,
  emailSendAction,
};
