// const useCases = require("../use-cases");
// const Joi = require("joi");
// const makeUsersControllers = require("./users");
// const userController = makeUsersControllers({
//   usersUseCases: useCases.usersUseCases,
//   Joi,
// });

// const makeFoldersControllers = require("./folders");
// const folderController = makeFoldersControllers({
//   Joi,
//   foldersUseCases: useCases.foldersUseCases,
// });

const users = require("./users");
const folders = require("./folders");
const auth = require("./auth");
const emails = require("./emails");
module.exports = {
  users,
  folders,
  auth,
  emails,
};
