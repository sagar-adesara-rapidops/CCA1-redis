function makeUpdateEmailBodyHtml({
  updateEmailBodyHtmlInDb,
  getEmailBodyHtml,
}) {
  return async function updateEmailBodyHtml({
    databaseName,
    contentId,
    emailId,
    attachmentPath,
  }) {
    console.log("Inside Insert Email usecase");

    let emailBody = await getEmailBodyHtml({ emailId, databaseName });
    console.log("REPLACE IT!!!!", "content id", contentId);
    emailBody = emailBody.replace(`cid:${contentId}`, attachmentPath);
    console.log("navi bodyy!!!!!", emailBody);
    const result = await updateEmailBodyHtmlInDb({
      emailBody,
      databaseName,
      emailId,
    });
    console.log("RESPOnse from update email USECASE)::::", result);

    return result;
  };
}
module.exports = makeUpdateEmailBodyHtml;
