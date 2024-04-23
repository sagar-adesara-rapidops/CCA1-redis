const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeUpdateUser = require("./update-user");

const sandbox = sinon.createSandbox();

const usersDb = {
  checkUserById: () => {},
  updateUserInDb: () => {},
};

const checkUserByIdStub = sandbox.stub(usersDb, "checkUserById");
checkUserByIdStub.callsFake((args) => {
  expect(args).deep.equal({ userId: this.userId });
  // if (this.emailAddress == "hello@gmail.com") {
  //   throw new Error("User Already exists");
  // }
});

const updateUserInDbStub = sandbox.stub(usersDb, "updateUserInDb");
updateUserInDbStub.callsFake((args) => {
  expect(args).deep.equal({
    newName: this.newName,
    userId: this.userId,
  });
});

After(() => {
  this.newName = undefined;
  this.userId = undefined;
  this.error = undefined;
  this.result = undefined;

  sandbox.resetHistory();
});

Given(
  "User details userId: {string}, newName: {string} to update user",
  (userId, newName) => {
    this.userId = userId || undefined;
    this.newName = newName || undefined;
  }
);

// Given(
//   'Already existed user details: "{string}" with same emailAddress',
//   (userDetailsByEmail) => {
//     this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
//   }
// );

When("Try to update user", async () => {
  const updateUser = makeUpdateUser({
    Joi,
    checkUserById: usersDb.checkUserById,
    updateUserInDb: usersDb.updateUserInDb,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    // if (this.name != undefined && parseInt(this.name)) {
    //   throw new Error(`"name" must be a string`);
    // }
    this.result = await updateUser({
      newName: this.newName,
      userId: this.userId,
    });
    // console.log(this.result);
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  "It will throw error: {string} with message: {string} while updating user",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will update user", () => {
  // expect(this.result).deep.equal(JSON.parse(newUserDetails));
});

//////////////////////////

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
