const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeCheckUserByEmail = require("./check-user-by-id");

const sandbox = sinon.createSandbox();

const usersDb = {
  selectuserByIdFromDb: () => {},
};

const selectuserByIdFromDbStub = sandbox.stub(usersDb, "selectuserByIdFromDb");
selectuserByIdFromDbStub.callsFake((args) => {
  expect(args).deep.equal({ userId: this.userId });
  if (this.userId == 22) {
    throw new Error("User Already exists");
  }
  // return this.userDetailsByEmail;
});

After(() => {
  this.userId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("User details userId: {string} to check user by id", (userId) => {
  this.userId = userId || undefined;
});

When("Try to check user by id", async () => {
  const checkUserById = makeCheckUserByEmail({
    Joi,
    selectuserByIdFromDb: usersDb.selectuserByIdFromDb,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    // if (this.name != undefined && parseInt(this.name)) {
    //   throw new Error(`"name" must be a string`);
    // }
    this.result = await checkUserById({ userId: this.userId });
    console.log(this.result);
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  "It will throw error: {string} with message: {string} while checking user by id",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will check user by id", () => {
  // expect(this.result).deep.equal(JSON.parse(newUserDetails));
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
