// function makeFoldersUseCases({ foldersDb }) {
//   const makeCreateFolderUseCase = require("./create-folder-use-case");
//   const createFolderUseCase = makeCreateFolderUseCase({ foldersDb });

//   const makeDisplayFoldersUseCase = require("./display-folders-use-case");
//   const displayFoldersUseCase = makeDisplayFoldersUseCase({ foldersDb });

//   const makeDeleteFolderUseCase = require("./delete-folder-use-case");
//   const deleteFolderUseCase = makeDeleteFolderUseCase({ foldersDb });

//   const makeUpdateFolderUseCase = require("./update-folder-use-case");
//   const updateFolderUseCase = makeUpdateFolderUseCase({ foldersDb });
//   return {
//     createFolderUseCase,
//     displayFoldersUseCase,
//     deleteFolderUseCase,
//     updateFolderUseCase,
//   };
// }

// module.exports = makeFoldersUseCases;

const dbs = require("../../data-access").cockroach;
const Joi = require("joi");
const users = require("../users");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const makeCheckFolderByProviderId = require("./check-folder-by-provider-id");
const checkFolderByProviderId = makeCheckFolderByProviderId({
  selectFolderByProviderIdFromDb: dbs.foldersDb.selectFolderByProviderIdFromDb,
});

const makeCheckFolderByName = require("./check-folder-by-name");
const checkFolderByName = makeCheckFolderByName({
  selectFolderByNameFromDb: dbs.foldersDb.selectFolderByNameFromDb,
});

const makeCreateFolder = require("./create-folder");
const createFolder = makeCreateFolder({
  Joi,
  createFolderInDb: dbs.foldersDb.createFolderInDb,
  checkFolderByName,
  checkFolderByProviderId,
  checkUserById: users.checkUserById,
  updateProviderIdInDb: dbs.foldersDb.updateProviderIdInDb,
  updatePriorityInDb: dbs.foldersDb.updatePriorityInDb,
});

const makeFetchFoldersFromProvider = require("./fetch-folders-from-provider");
const fetchFoldersFromProvider = makeFetchFoldersFromProvider({
  client,
  google,
  createFolder,
});

const makeCreateDefaultFolders = require("./create-default-folders");
const createDefaultFolders = makeCreateDefaultFolders({
  Joi,
  createFolderInDb: dbs.foldersDb.createFolderInDb,
  checkFolderByName,
  checkUserById: users.checkUserById,
  createFolder,
});

const makeDisplayFolders = require("./display-folders");
const displayFolders = makeDisplayFolders({
  Joi,
  displayFoldersFromDb: dbs.foldersDb.displayFoldersFromDb,
});

const makeDeleteFolder = require("./delete-folder");
const deleteFolder = makeDeleteFolder({
  Joi,
  deleteFolderFromDb: dbs.foldersDb.deleteFolderFromDb,
});

const makeUpdateFolder = require("./update-folder");
const { foldersDb } = require("../../data-access");
const updateFolder = makeUpdateFolder({
  Joi,
  updateFolderInDb: dbs.foldersDb.updateFolderInDb,
  checkUserById: users.checkUserById,
  checkFolderByName,
});

const makeGetPriorityFolder = require("./get-priority-folder");
const getPriorityFolder = makeGetPriorityFolder({
  getPriorityFolderFromDb: dbs.foldersDb.getPriorityFolderFromDb,
});

const makeUpdateFolderSyncState = require("./update-folder-sync-state");
const updateFolderSyncState = makeUpdateFolderSyncState({
  updateFolderSyncStateInDb: dbs.foldersDb.updateFolderSyncStateInDb,
});
module.exports = {
  createFolder,
  displayFolders,
  deleteFolder,
  updateFolder,
  checkFolderByName,
  checkFolderByProviderId,
  createDefaultFolders,
  fetchFoldersFromProvider,
  getPriorityFolder,
  updateFolderSyncState,
};
