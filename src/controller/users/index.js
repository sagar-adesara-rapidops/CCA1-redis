// function makeUsersControllers({ Joi, usersUseCases }) {
//   const makeCreateUserController = require("./create-user-controller");
//   const createUserController = makeCreateUserController({ Joi, usersUseCases });

//   const makeDisplayUsersController = require("./display-users-controller");
//   const displayUsersController = makeDisplayUsersController({ usersUseCases });

//   const makeDeleteUserController = require("./delete-user-controller");
//   const deleteUserController = makeDeleteUserController({ usersUseCases });

//   const makeUpdateUserController = require("./update-user-controller");
//   const updateUserController = makeUpdateUserController({ Joi, usersUseCases });
//   return {
//     createUserController,
//     displayUsersController,
//     deleteUserController,
//     updateUserController,
//   };
// }

// module.exports = makeUsersControllers;

const useCases = require("../../use-cases");
const Joi = require("joi");

const makeCreateUserAction = require("./create-user");
const createUserAction = makeCreateUserAction({
  Joi,
  checkUserByEmail: useCases.users.checkUserByEmail,
  createUser: useCases.users.createUser,
  createDefaultFolders: useCases.folders.createDefaultFolders,
});

const makeDisplayUsersAction = require("./display-users");
const displayUsersAction = makeDisplayUsersAction({
  displayUsers: useCases.users.displayUsers,
});

const makeDisplayUserAction = require("./display-user");
const displayUserAction = makeDisplayUserAction({
  displayUser: useCases.users.displayUser,
});

const makeDeleteUserAction = require("./delete-user");
const deleteUserAction = makeDeleteUserAction({
  Joi,
  checkUserById: useCases.users.checkUserById,
  deleteUser: useCases.users.deleteUser,
});

const makeUpdateUserAction = require("./update-user");
const updateUserAction = makeUpdateUserAction({
  Joi,
  checkUserById: useCases.users.checkUserById,
  updateUser: useCases.users.updateUser,
});
module.exports = {
  createUserAction,
  displayUsersAction,
  deleteUserAction,
  updateUserAction,
  displayUserAction,
};
