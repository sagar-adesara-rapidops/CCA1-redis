const { Kafka } = require("kafkajs");
const useCases = require("../use-cases");
const fetchFoldersFromProvider = useCases.folders.fetchFoldersFromProvider;
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "fetch-folders-from-provider" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "userCreated", fromBeginning: true });

  //BEFORE MSG
  // consumer.
  // const offset = await consumer.offsetsForCommittedTopics(["userCreated"]);
  // console.log("OFFSET VALUE", offset);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("FETCH FOLDERS HANDLERS FILE :: reached each msg function");
      const { userId, databaseName, accessToken } = await JSON.parse(
        message.value.toString()
      );
      console.log("MESSAGE inside fetch handlers", {
        userId,
        databaseName,
        accessToken,
      });

      await fetchFoldersFromProvider({ userId, databaseName, accessToken });
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      //Producing
      const sendObject = { userId, databaseName, accessToken };
      await useCases.kafka.kafkaProducer({
        topic: "foldersCreated",
        message: JSON.stringify(sendObject),
      });
      // const producer = kafka.producer();
      // await producer.connect();
      // await producer.send({
      //   topic: "foldersCreated",
      //   messages: [{ value: JSON.stringify(sendObject) }],
      // });
      // await producer.disconnect();
    },
  });
};

run().catch(console.error);

console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
