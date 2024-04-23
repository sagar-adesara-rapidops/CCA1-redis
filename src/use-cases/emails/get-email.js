function makeGetEmail({ getThreadIdFromDb, getThreadMailsFromDb }) {
  return async function getEmail({ emailId, databaseName }) {
    console.log("Inside get email usecase");
    const threadId = await getThreadIdFromDb({ databaseName, emailId });
    const result = await getThreadMailsFromDb({ databaseName, threadId });
    return result;
  };
}

module.exports = makeGetEmail;
