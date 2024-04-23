function makeInsertRecipients({ insertRecipientsIntoDb }) {
  return async function insertRecipeints({
    databaseName,
    emailId,
    recipientEmailAddress,
    type,
  }) {
    try {
      let result = await insertRecipientsIntoDb({
        databaseName,
        emailId,
        recipientEmailAddress,
        type,
      });
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeInsertRecipients;
