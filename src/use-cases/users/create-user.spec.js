const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const exceptions = require("../../exceptions");
const makeCreateUser = require("./create-user");

const sandbox = sinon.createSandbox();

const usersDb = {
  checkUserByEmail: () => {},
  createUserInDb: () => {},
};

const getUsersDetailByEmailStub = sandbox.stub(usersDb, "checkUserByEmail");
getUsersDetailByEmailStub.callsFake((args) => {
  expect(args).deep.equal({ emailAddress: this.emailAddress });
  if (this.emailAddress == "hello@gmail.com") {
    throw new Error("User Already exists");
  }
  // return this.userDetailsByEmail;
});

const createUserStub = sandbox.stub(usersDb, "createUserInDb");
createUserStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    emailAddress: this.emailAddress,
  });
  return [{ id: 1, insertId: 1 }, {}];
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
  "User details name: {string}, emailAddress: {string} to create new user",
  (name, emailAddress) => {
    this.name = name || undefined;
    this.emailAddress = emailAddress || undefined;
  }
);
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

When("Try to create new user", async () => {
  const createUser = makeCreateUser({
    Joi,
    checkUserByEmail: usersDb.checkUserByEmail,
    createUserInDb: usersDb.createUserInDb,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.forbiddenError,
  });

  try {
    if (this.name != undefined && parseInt(this.name)) {
      throw new Error(`"name" must be a string`);
    }
    this.result = await createUser({
      name: this.name,
      emailAddress: this.emailAddress,
    });
  } catch (e) {
    // console.log("ERRROORRRRRRR!!!!", e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating new user',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will create new user with details: {string}", (newUserDetails) => {
  expect(this.result).deep.equal(JSON.parse(newUserDetails));
});

Then(
  "GetUsersDetailByEmail function will call {int} time while creating new user",
  (getUsersDetailByEmailFunctionCallCount) => {
    sinon.assert.callCount(
      getUsersDetailByEmailStub,
      getUsersDetailByEmailFunctionCallCount
    );
  }
);

Then(
  "createUser function will call {int} time while creating new user",
  (createUserFunctionCallCount) => {
    sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
  }
);
