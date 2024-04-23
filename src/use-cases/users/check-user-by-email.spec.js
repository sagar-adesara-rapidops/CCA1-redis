const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeCheckUserByEmail = require("./check-user-by-email");

const sandbox = sinon.createSandbox();

const usersDb = {
  selectuserByEmailFromDb: () => {},
};

const selectuserByEmailFromDbStub = sandbox.stub(
  usersDb,
  "selectuserByEmailFromDb"
);
selectuserByEmailFromDbStub.callsFake((args) => {
  expect(args).deep.equal({ emailAddress: this.emailAddress });
  if (this.emailAddress == "hello@gmail.com") {
    throw new Error("User Already exists");
  }
  // return this.userDetailsByEmail;
});

After(() => {
  this.emailAddress = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("User details emailAddress: {string} to check user", (emailAddress) => {
  this.emailAddress = emailAddress || undefined;
});
// Given(
//   "User details name: {int}, emailAddress: {string} to create new user",
//   (name, emailAddress) => {
//     this.name = name || undefined;
//     this.emailAddress = emailAddress || undefined;
//   }
// );

Given(
  'Already existed user details: "{string}" with same emailAddress',
  (userDetailsByEmail) => {
    this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
  }
);

When("Try to check user", async () => {
  const checkUserByEmail = makeCheckUserByEmail({
    Joi,
    selectuserByEmailFromDb: usersDb.selectuserByEmailFromDb,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    // if (this.name != undefined && parseInt(this.name)) {
    //   throw new Error(`"name" must be a string`);
    // }
    this.result = await checkUserByEmail({ emailAddress: this.emailAddress });
    console.log(this.result);
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  "It will throw error: {string} with message: {string} while checking user",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will check user", () => {
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
