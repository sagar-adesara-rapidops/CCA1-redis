const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeUpdateFolder = require("./update-folder");

const sandbox = sinon.createSandbox();

const foldersDb = {
  updateFolderInDb: () => {},
  checkFolderByName: () => {},
};

const updateFolderInDbStub = sandbox.stub(foldersDb, "updateFolderInDb");
updateFolderInDbStub.callsFake((args) => {
  expect(args).deep.equal({
    folderName: this.folderName,
    folderId: this.folderId,
  });
});

const checkFolderByNameStub = sandbox.stub(foldersDb, "checkFolderByName");
checkFolderByNameStub.callsFake((args) => {
  expect(args).deep.equal({ folderName: this.folderName, userId: this.userId });
  if (this.folderName == "usedName") {
    throw new Error('"folderName" already used');
  }
});

After(() => {
  this.folderName = undefined;
  this.userId = undefined;
  this.folderId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Folder details folderName: {string}, folderId: {string}, userId: {string} to update folder",
  (folderName, folderId, userId) => {
    this.folderName = folderName || undefined;
    this.folderId = folderId || undefined;
    this.userId = userId || undefined;
  }
);

When("Try to update folder", async () => {
  const updateFolder = makeUpdateFolder({
    Joi,
    updateFolderInDb: foldersDb.updateFolderInDb,
    checkFolderByName: foldersDb.checkFolderByName,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    if (this.folderName != undefined && parseInt(this.folderName)) {
      throw new Error(`"folderName" must be a string`);
    }
    this.result = await updateFolder({
      folderName: this.folderName,
      folderId: this.folderId,
      userId: this.userId,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while updating folder',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will update folder", () => {
  console.log("this.result", this.result);
  expect(this.result).deep.equal();
});
