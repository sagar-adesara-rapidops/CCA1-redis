function makeTopicsDb({ cockroach }) {
  return { insertTopicIntoDb, checkIfMessageExists };
  // const res = await cockroach.query("SELECT $1::text as message", [
  //   "Hello world!",
  // ]);
  async function insertTopicIntoDb({ databaseName, userId, topic }) {
    try {
      // console.log("emailid", emailId);
      let result = await cockroach.query(
        `INSERT INTO kafka_topics.topics (user_id, tenant_id, topic_name) values ($1,$2,$3)`,
        [userId, databaseName, topic]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function checkIfMessageExists({ databaseName, userId, topic }) {
    try {
      // console.log("emailid", emailId);
      let result = await cockroach.query(
        `SELECT * FROM kafka_topics.topics where user_id=$1 AND tenant_id=$2 AND topic_name=$3`,
        [userId, databaseName, topic]
      );
      console.log("Result frm check msg");
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeTopicsDb;
