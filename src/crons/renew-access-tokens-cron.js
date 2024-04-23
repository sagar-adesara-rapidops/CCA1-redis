const { Kafka } = require("kafkajs");
// const cockroachDb = require("../data-access").cockroach;
const useCases = require("../use-cases");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const run = async () => {
  const databaseName = "email_client_cockroach1";
  const minuteInEpochTime = 60000;
  const soonToExpireTime = +new Date() + 30 * minuteInEpochTime;

  const result = await useCases.users.getExpiringSoonUsersRefreshToken({
    databaseName,
    soonToExpireTime,
  });
  // console.log("Fetchedd users and tokens:", result);

  await producer.connect();
  const sendObject = { users: result };
  await producer.send({
    topic: "expiring-tokens",
    messages: [{ value: JSON.stringify(sendObject) }],
  });

  await producer.disconnect();
};
run().catch(console.error);
