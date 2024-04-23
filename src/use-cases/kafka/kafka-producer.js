function makeKafkaProducer({ Kafka, checkIfMessageExists, insertTopicIntoDb }) {
  return async function kafkaProducer({
    topic,
    message,
    userId,
    databaseName,
  }) {
    try {
      // const msgExists = await checkIfMessageExists({
      //   topic,
      //   userId,
      //   databaseName,
      // });
      // if (msgExists) {
      //   return;
      // } else {
      // await insertTopicIntoDb();
      const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092"],
      });
      const producer = kafka.producer();

      await producer.connect();
      // store in redis:  topic:unique "Akho msg"
      await producer.send({
        topic,
        messages: [{ value: message }],
      });
      // }
      // await producer.disconnect();
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeKafkaProducer;
