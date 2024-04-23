const useCases = require("../../use-cases");
const Joi = require("joi");

const makeCreateFolderAction = require("./create-folder");
const createFolderAction = makeCreateFolderAction({
  Joi,
  createFolder: useCases.folders.createFolder,
  CheckFolderByName: useCases.folders.checkFolderByName,
  checkFolderByProviderId: useCases.folders.checkFolderByProviderId,
});

const makeDisplayFoldersAction = require("./display-folders");
const displayFoldersAction = makeDisplayFoldersAction({
  Joi,
  displayFolders: useCases.folders.displayFolders,
});

const makeDeleteFolderAction = require("./delete-folder");
const deleteFolderAction = makeDeleteFolderAction({
  Joi,
  deleteFolder: useCases.folders.deleteFolder,
});

const makeUpdateFolderAction = require("./update-folder");
const updateFolderAction = makeUpdateFolderAction({
  Joi,
  checkFolderByName: useCases.folders.checkFolderByName,
  updateFolder: useCases.folders.updateFolder,
});

module.exports = {
  createFolderAction,
  displayFoldersAction,
  deleteFolderAction,
  updateFolderAction,
};
