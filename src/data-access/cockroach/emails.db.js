function makeEmailsDb({ cockroach }) {
  return {
    insertEmailIntoDb,
    updateEmailBodyHtmlInDb,
    getEmailBodyHtmlFromDb,
    getThreadIdFromDb,
    getThreadMailsFromDb,
  };

  async function insertEmailIntoDb({
    databaseName,
    emailSubject,
    emailBodyText,
    emailBodyHtml,
    threadId,
    createdAt,
    userId,
    isRead,
    imid,
    inReplyTo,
    scheduledAt,
    snippet,
    isArchive,
    isTrashed,
  }) {
    try {
      let result = await cockroach.query(
        `INSERT INTO ${databaseName}.emails (email_subject, email_body_text,  email_body_html, thread_id, created_at, user_id, is_read, imid, in_reply_to, scheduled_at, snippet, is_archive, is_trashed) VALUES($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13) RETURNING email_id;`,
        [
          emailSubject,
          emailBodyText,
          emailBodyHtml,
          threadId,
          createdAt,
          userId,
          isRead,
          imid,
          inReplyTo,
          scheduledAt,
          snippet,
          isArchive,
          isTrashed,
        ]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function updateEmailBodyHtmlInDb({ databaseName, emailBody, emailId }) {
    try {
      let result = await cockroach.query(
        `UPDATE ${databaseName}.emails SET  email_body_html= $1 WHERE email_id = $2 RETURNING email_body_html;`,
        [emailBody, emailId]
      );
      return result.rows[0].email_body_html;
    } catch (err) {
      throw err;
    }
  }

  async function getEmailBodyHtmlFromDb({ databaseName, emailId }) {
    try {
      let result = await cockroach.query(
        `SELECT email_body_html from ${databaseName}.emails where email_id = $1`,
        [emailId]
      );
      return result.rows[0].email_body_html;
    } catch (err) {
      throw err;
    }
  }

  // getEmailFromDb;
  // getThreadMailsFromDb
  async function getThreadIdFromDb({ databaseName, emailId }) {
    try {
      let result = await cockroach.query(
        `SELECT thread_id FROM  ${databaseName}.emails where email_id = $1`,
        [emailId]
      );
      console.log("get email result:", result.rows);
      return result.rows[0].thread_id;
    } catch (err) {
      throw err;
    }
  }
  async function getThreadMailsFromDb({ databaseName, threadId }) {
    try {
      let result = await cockroach.query(
        `SELECT * FROM  ${databaseName}.emails where thread_id = $1`,
        [threadId]
      );
      console.log("get thread mails query:", result.rows);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeEmailsDb;
