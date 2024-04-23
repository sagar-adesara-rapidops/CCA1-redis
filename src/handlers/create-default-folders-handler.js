const { Kafka } = require("kafkajs");
const useCases = require("../use-cases");
// const folders = require("../use-cases/folders");
const createDefaultFolders = useCases.folders.createDefaultFolders;
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

// const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "create-default-folder" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "userCreated", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        "CREATE DEFAULT FOLDERS HANDLERS FILE :: reached each msg function"
      );
      parameters = await JSON.parse(message.value.toString());
      console.log("MESSAGE inside default folder handlers", parameters);
      await createDefaultFolders({
        databaseName: parameters.databaseName,
        userId: parameters.userId,
      });

      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
