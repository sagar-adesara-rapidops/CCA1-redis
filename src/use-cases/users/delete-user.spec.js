const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeDeleteUser = require("./delete-user");

const sandbox = sinon.createSandbox();

const usersDb = {
  deleteUserFromDb: () => {},
  checkUserById: () => {},
};

const deleteUserFromDbStub = sandbox.stub(usersDb, "deleteUserFromDb");
deleteUserFromDbStub.callsFake((args) => {
  expect(args).deep.equal({ userId: this.userId });
});

const checkUserByIdStub = sandbox.stub(usersDb, "checkUserById");
checkUserByIdStub.callsFake((args) => {
  expect(args).deep.equal({ userId: this.userId });
  if (this.userId == "22") {
    throw new Error("User doesn't exist");
  }
  // return this.userDetailsByEmail;
});

After(() => {
  this.userId = undefined;
  this.error = undefined;
  this.result = undefined;

  sandbox.resetHistory();
});

Given("User details userId: {string} to delete user", (userId) => {
  this.userId = userId || undefined;
});

When("Try to delete user", async () => {
  const deleteUser = makeDeleteUser({
    Joi,
    deleteUserFromDb: usersDb.deleteUserFromDb,
    checkUserById: usersDb.checkUserById,
    // ValidationError: exceptions.ValidationError,
    // ForbiddenError: exceptions.forbiddenError,
  });

  try {
    this.result = await deleteUser({
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
  "It will throw error: {string} with message: {string} while deleting user",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will delete user {string}", (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
