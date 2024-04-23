const dbs = require("../../data-access").cockroach;

const makeInsertRecipients = require("./insert-recipients");
const insertRecipeints = makeInsertRecipients({
  insertRecipientsIntoDb: dbs.recipients.insertRecipientsIntoDb,
});

module.exports = {
  insertRecipeints,
};
