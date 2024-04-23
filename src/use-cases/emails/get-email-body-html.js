// updateEmailBodyHtml
function makeGetEmailBodyHtml({ getEmailBodyHtmlFromDb }) {
  return async function getEmailBodyHtml({ databaseName, emailId }) {
    console.log("Inside Insert Email usecase");

    const emailBody = await getEmailBodyHtmlFromDb({ emailId, databaseName });

    console.log("RESPOnse from get body USECASE)::::", emailBody);

    return emailBody;
  };
}
module.exports = makeGetEmailBodyHtml;
