const express = require("express");
// const { func } = require("joi");
const router = express.Router();
const controller = require("./controller");

init();
function init() {
  function users() {
    router.post("/users/", controller.users.createUserAction);
    router.patch("/users/:userId", controller.users.updateUserAction);
    router.delete("/users/:userId", controller.users.deleteUserAction);
    router.get("/users/", controller.users.displayUsersAction);
    router.get("/users/:userId", controller.users.displayUserAction);
  }
  function folders() {
    router.post("/folders/:userId", controller.folders.createFolderAction);
    router.patch("/folders/:folderId", controller.folders.updateFolderAction);
    router.delete("/folders/:folderId", controller.folders.deleteFolderAction);
    router.get("/folders/:userId", controller.folders.displayFoldersAction);
  }
  function auth() {
    router.get(
      "/auth/google/login",
      controller.auth.authAction.googleAuthLogin
    );
    router.get(
      "/auth/google/callback",
      controller.auth.authAction.googleAuthCallback
    );
    router.post("/auth/google/email/send", controller.auth.emailSendAction);
  }
  function emails() {
    router.get("/emails/:mailId", controller.emails.getEmailAction);
  }
  users();
  folders();
  auth();
  emails();
}

module.exports = router;
