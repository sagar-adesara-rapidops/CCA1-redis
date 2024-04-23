function makeAttachmentsDb({ cockroach }) {
  return { insertAttachmentIntoDb };
  // const res = await cockroach.query("SELECT $1::text as message", [
  //   "Hello world!",
  // ]);
  async function insertAttachmentIntoDb({
    databaseName,
    attachmentPath,
    emailId,
    fileName,
    size,
  }) {
    try {
      // console.log("emailid", emailId);
      let result = await cockroach.query(
        `INSERT INTO ${databaseName}.attachments (email_id, attachment_name, attachment_size, attachment_path) values ($1,$2,$3,$4)`,
        [emailId, fileName, size, attachmentPath]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function selectuserByEmailFromDb({ databaseName, emailAddress }) {
    try {
      let result = await cockroach.query(
        `SELECT * FROM ${databaseName}.users WHERE email_address = $1`,
        [emailAddress]
      );
      return [result];
    } catch (err) {
      throw err;
    }
  }

  async function selectuserByIdFromDb({ databaseName, userId }) {
    try {
      let result = await cockroach.query(
        `SELECT user_id FROM ${databaseName}.users WHERE user_id = $1`,
        [userId]
      );
      console.log("RESULT IN DB ACCESS", result);
      return [result.rows, "fields"];
    } catch (err) {
      throw err;
    }
  }

  async function displayUsersFromDb({ databaseName }) {
    try {
      let result = await cockroach.query(
        `SELECT name,email_address FROM ${databaseName}.users`
      );
      return [result.rows, "fields"];
    } catch (err) {
      throw err;
    }
  }
  async function deleteUserFromDb({ databaseName, userId }) {
    try {
      let result = await cockroach.query(
        `DELETE FROM ${databaseName}.users WHERE user_id = $1`,
        [userId]
      );
    } catch (err) {
      throw err;
    }
  }
  async function updateUserInDb({ databaseName, newName, userId }) {
    try {
      console.log("update user ki query", databaseName, newName, userId);
      let result = await cockroach.query(
        `UPDATE  ${databaseName}.users SET name = $1 where user_id = $2`,
        [newName, userId]
      );
    } catch (err) {
      throw err;
    }
  }

  async function getExpiringSoonUsersRefreshTokenFromDb({
    databaseName,
    soonToExpireTime,
  }) {
    try {
      let result = await cockroach.query(
        `SELECT refresh_token, user_id FROM ${databaseName}.users where expiry_date < $1`,
        [soonToExpireTime]
      );
      return [result.rows, "fields"];
    } catch (err) {
      throw err;
    }
  }

  async function updateAccessTokenInDb({
    databaseName,
    accessToken,
    userId,
    expiryDate,
  }) {
    try {
      let result = await cockroach.query(
        `UPDATE  ${databaseName}.users SET access_token = $1, expiry_date= $2 where user_id = $3 RETURNING access_token;`,
        [accessToken, expiryDate, userId]
      );
      console.log("UPDATE QUERY result:", result);
      return [result, "fields"];
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeAttachmentsDb;
