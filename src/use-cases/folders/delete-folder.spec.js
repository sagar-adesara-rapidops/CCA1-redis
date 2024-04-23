const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");
const makeDeleteFolder = require("./delete-folder");
// const { folderName } = require("./create-folder.spec");
const sandbox = sinon.createSandbox();

const foldersDb = {
  deleteFolderFromDb: () => {},
};

const deleteFolderFromDbStub = sandbox.stub(foldersDb, "deleteFolderFromDb");
deleteFolderFromDbStub.callsFake((args) => {
  expect(args).deep.equal({
    folderId: this.folderId,
  });

  return "folder is deleted";
});

After(() => {
  this.folderId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
Given("folder Id: {string} to delete folder", (folderId) => {
  this.folderId = folderId || undefined;
});

When("Try to delete folder", async () => {
  if (this.folderId) {
    this.folderId = parseInt(this.folderId);
  }
  const deleteFolder = makeDeleteFolder({
    Joi,
    deleteFolderFromDb: foldersDb.deleteFolderFromDb,
  });
  try {
    this.result = await deleteFolder({
      folderId: this.folderId,
    });
  } catch (e) {
    this.error = {
      message: e.message,
    };
  }
});
Then("It will give message: {string} while deleting folder", (message) => {
  if (this.error) expect(this.error.message).deep.equal(message);
  else expect(this.result).deep.equal(message);
});
