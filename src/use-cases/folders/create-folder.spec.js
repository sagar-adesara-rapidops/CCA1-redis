const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeCreateFolder = require("./create-folder");

const sandbox = sinon.createSandbox();

const foldersDb = {
  checkFolderByName: () => {},
  checkFolderByProviderId: () => {},
  createFolderInDb: () => {},
};

const checkFolderByNameStub = sandbox.stub(foldersDb, "checkFolderByName");
checkFolderByNameStub.callsFake((args) => {
  expect(args).deep.equal({ folderName: this.folderName, userId: this.userId });
  if (this.folderName == "Exists") {
    throw new Error("Folder Already exists");
  }
});

const checkFolderByProviderIdStub = sandbox.stub(
  foldersDb,
  "checkFolderByProviderId"
);
checkFolderByProviderIdStub.callsFake((args) => {
  expect(args).deep.equal({ providerId: this.providerId, userId: this.userId });
  if (this.providerId == "usedProviderId") {
    throw new Error('"providerId" Already exists');
  }
});

const createFolderInDbStub = sandbox.stub(foldersDb, "createFolderInDb");
createFolderInDbStub.callsFake((args) => {
  console.log("ARGSSSSSS", args);
  console.log("this.folderName:", this.folderName);
  console.log("this.providerId", this.providerId);
  expect(args).deep.equal({
    folderName: this.folderName,
    userId: this.userId,
    providerId: this.providerId,
  });
});
After(() => {
  this.name = undefined;
  this.emailAddress = undefined;
  this.userDetailsByEmail = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Folder details folderName: {string}, userId: {string}, providerId: {string} to create new folder",
  (folderName, userId, providerId) => {
    this.folderName = folderName || undefined;
    this.userId = userId || undefined;
    this.providerId = providerId || undefined;
  }
);
// Given(
//   "User details name: {int}, emailAddress: {string} to create new user",
//   (name, emailAddress) => {
//     this.name = name || undefined;
//     this.emailAddress = emailAddress || undefined;
//   }
// );

// Given(
//   'Already existed user details: "{string}" with same emailAddress',
//   (userDetailsByEmail) => {
//     this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
//   }
// );

When("Try to create new folder", async () => {
  const createFolder = makeCreateFolder({
    Joi,
    checkFolderByName: foldersDb.checkFolderByName,
    checkFolderByProviderId: foldersDb.checkFolderByProviderId,
    createFolderInDb: foldersDb.createFolderInDb,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    if (this.folderName != undefined && parseInt(this.folderName)) {
      throw new Error(`"folderName" must be a string`);
    }
    this.result = await createFolder({
      folderName: this.folderName,
      providerId: this.providerId,
      userId: this.userId,
    });
    console.log("RESULT::::::::", this.result);
  } catch (e) {
    console.log("ERRROORRRRRRR!!!!", e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating new folder',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will create new folder with details: {string}", (message) => {
  console.log("message:", message);
  console.log("this.result", this.result);
  expect(this.result).deep.equal(message);
});

// Then(
//   "GetUsersDetailByEmail function will call {int} time while creating new user",
//   (getUsersDetailByEmailFunctionCallCount) => {
//     sinon.assert.callCount(
//       getUsersDetailByEmailStub,
//       getUsersDetailByEmailFunctionCallCount
//     );
//   }
// );

// Then(
//   "createUser function will call {int} time while creating new user",
//   (createUserFunctionCallCount) => {
//     sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
//   }
// );
