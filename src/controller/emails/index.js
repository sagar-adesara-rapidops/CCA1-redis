const useCases = require("../../use-cases");
const Joi = require("joi");

const makeGetEmailAction = require("./get-email");
const getEmailAction = makeGetEmailAction({
  getEmail: useCases.emails.getEmail,
  // Joi,
  // createFolder: useCases.folders.createFolder,
  // CheckFolderByName: useCases.folders.checkFolderByName,
  // checkFolderByProviderId: useCases.folders.checkFolderByProviderId,
});

module.exports = {
  getEmailAction,
};
