const useCases = require("../use-cases");
const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const Consumer = kafka.consumer({ groupId: "emailSend" });
const run = async () => {
  await Consumer.connect();
  await Consumer.subscribe({
    topic: "emailCreated",
    // fromBeginning: true,
  });
  await Consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
      const value = JSON.parse(message.value.toString());
      await useCases.emails.googleAuthSendEmail({
        accessToken: value.accessToken,
        database: value.database,
        requestBody: value.requestBody,
      });
    },
  });
};

run().catch((e) => console.error(` ${e.message}`, e));
