const { Kafka } = require("kafkajs");
const { OAuth2Client } = require("google-auth-library");
const useCases = require("../use-cases");

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "renew-access-token" });
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "expiring-tokens", fromBeginning: true });
  console.log("Handler file");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        "RENEW ACCESS TOKEN HANDLER FILE ::  reached each msg function"
      );
      parameters = await JSON.parse(message.value.toString());

      console.log("PARAMETERS", parameters.users);

      parameters.users.forEach((user) => {
        client.setCredentials({ refresh_token: user.refresh_token });
        client
          .getAccessToken()
          .then(async (tokenResponse) => {
            console.log("TOKEN RESPONSE::::::", tokenResponse);
            console.log(
              "exipration time::::::::::",
              tokenResponse.res.data.expiry_date
            );
            const accessToken = tokenResponse.token;
            const databaseName = "email_client_cockroach1";
            const expiryDate = tokenResponse.res.data.expiry_date;
            console.log("NEW ACCESS TOKEN: ", accessToken);
            await useCases.users.updateAccessToken({
              accessToken,
              databaseName,
              expiryDate,
              userId: user.user_id,
            });
            //delete message in redis that was recieved from kafka
          })
          .catch((err) => {
            console.log("ERRORR CREATING ACCESS TOKEN:: ", err);
          });
      });
      console.log({
        value: message.value.toString(),
      });
    },
  });
};
run().catch(console.error);
