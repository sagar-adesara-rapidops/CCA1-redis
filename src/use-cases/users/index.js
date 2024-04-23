// function makeUsersUseCases({ usersDb }) {
//   const makeCheckUserByEmailUseCase = require("./check-user-by-email");
//   const checkUserByEmailUseCase = makeCheckUserByEmailUseCase({ usersDb });

//   const makeCheckUserByIdUseCase = require("./check-user-by-id");
//   const checkUserByIdUseCase = makeCheckUserByIdUseCase({ usersDb });

//   const makeCreateUserUseCase = require("./create-user-use-case");
//   const createUserUseCase = makeCreateUserUseCase({ usersDb });

//   const makeDisplayUsersUseCase = require("./display-users-use-case");
//   const displayUsersUseCase = makeDisplayUsersUseCase({ usersDb });

//   const makeDeleteUserUseCase = require("./delete-user-use-case");
//   const deleteUserUseCase = makeDeleteUserUseCase({ usersDb });

//   const makeUpdateUserUseCase = require("./update-user-usecase");
//   const updateUserUseCase = makeUpdateUserUseCase({ usersDb });
//   return {
//     createUserUseCase,
//     displayUsersUseCase,
//     deleteUserUseCase,
//     updateUserUseCase,
//     checkUserByEmailUseCase,
//     checkUserByIdUseCase,
//   };
// }

// module.exports = makeUsersUseCases;

const dbs = require("../../data-access").cockroach;
const Joi = require("joi");
const kafka = require("../kafka");

const makeCheckUserByEmail = require("./check-user-by-email");
const checkUserByEmail = makeCheckUserByEmail({
  selectuserByEmailFromDb: dbs.usersDb.selectuserByEmailFromDb,
  Joi,
});

const makeCheckUserById = require("./check-user-by-id");
const checkUserById = makeCheckUserById({
  selectuserByIdFromDb: dbs.usersDb.selectuserByIdFromDb,
  Joi,
});

const makeCheckFolderByName = require("../folders/check-folder-by-name");
const checkFolderByName = makeCheckFolderByName({
  selectFolderByNameFromDb: dbs.foldersDb.selectFolderByNameFromDb,
});

const makeCreateDefaultFolders = require("../folders/create-default-folders");
const createDefaultFolders = makeCreateDefaultFolders({
  Joi,
  createFolderInDb: dbs.foldersDb.createFolderInDb,
  checkFolderByName,
  checkUserById,
});
const makeCreateUser = require("./create-user");
const createUser = makeCreateUser({
  createUserInDb: dbs.usersDb.createUserInDb,
  checkUserByEmail,
  createDefaultFolders,
  Joi,
  kafka,
  insertUserIntoRedis: dbs.redisStore.insertUserIntoRedis,
});

const makeDisplayUsers = require("./display-users");
const displayUsers = makeDisplayUsers({
  displayUsersFromDb: dbs.usersDb.displayUsersFromDb,
});

const makeDisplayUser = require("./display-user");
const displayUser = makeDisplayUser({
  displayUserFromRedis: dbs.redisStore.displayUserFromRedis,
  displayUserFromDb: dbs.usersDb.displayUserFromDb,
});

const makeDeleteUser = require("./delete-user");
const deleteUser = makeDeleteUser({
  deleteUserFromDb: dbs.usersDb.deleteUserFromDb,
  checkUserById,
  Joi,
});

const makeUpdateUser = require("./update-user");
const updateUser = makeUpdateUser({
  updateUserInDb: dbs.usersDb.updateUserInDb,
  checkUserById,
  Joi,
  displayUser,
  insertUserIntoRedis: dbs.redisStore.insertUserIntoRedis,
});

const makeUpdateAccessToken = require("./update-access-token");
const updateAccessToken = makeUpdateAccessToken({
  updateAccessTokenInDb: dbs.usersDb.updateAccessTokenInDb,
});
const makeGetExpiringSoonUsersRefreshToken = require("./get-expiring-soon-users-refresh-token");
const getExpiringSoonUsersRefreshToken = makeGetExpiringSoonUsersRefreshToken({
  getExpiringSoonUsersRefreshTokenFromDb:
    dbs.usersDb.getExpiringSoonUsersRefreshTokenFromDb,
});

module.exports = {
  createUser,
  displayUsers,
  deleteUser,
  updateUser,
  checkUserByEmail,
  checkUserById,
  updateAccessToken,
  getExpiringSoonUsersRefreshToken,
  displayUser,
};
