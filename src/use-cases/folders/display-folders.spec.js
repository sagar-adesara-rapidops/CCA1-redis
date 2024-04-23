const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeDisplayFolders = require("./display-folders");

const sandbox = sinon.createSandbox();

const foldersDb = {
  displayFoldersFromDb: () => {},
};

const displayFoldersFromDbStub = sandbox.stub(
  foldersDb,
  "displayFoldersFromDb"
);
displayFoldersFromDbStub.callsFake((args) => {
  expect(args).deep.equal({ userId: this.userId });
});

After(() => {
  this.userId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("Folder details userId: {string} to display folders", (userId) => {
  this.userId = userId || undefined;
});

When("Try to display folders", async () => {
  const displayFolders = makeDisplayFolders({
    Joi,
    displayFoldersFromDb: foldersDb.displayFoldersFromDb,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    this.result = await displayFolders({ userId: this.userId });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while displaying folders',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will display folders", () => {
  expect(this.result).deep.equal();
});
