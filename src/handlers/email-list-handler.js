const { Kafka } = require("kafkajs");
const useCases = require("../use-cases");
const getEmailsList = useCases.emails.getEmailsList;
const getPriorityFolder = useCases.folders.getPriorityFolder;
const updateFolderSyncState = useCases.folders.updateFolderSyncState;
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

// const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "fetch-email-list" });
console.log("TYPE,", getEmailsList);

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "foldersCreated", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("FETCH EMAIL LIST FILE :: reached each msg function");
      const { userId, databaseName, accessToken, nextPageToken } =
        await JSON.parse(message.value.toString());
      currentDate = new Date();
      console.log("MESSAGE inside fetch email list handlers", {
        userId,
        databaseName,
        accessToken,
        nextPageToken,
      });
      const result = await getPriorityFolder({ userId, databaseName });
      if (!result) {
        console.log("Bdha folders complete");
        return;
      }
      const folderName = result.folder_name;
      const folderId = result.folder_id;
      console.log("FOLDERENAME", folderName, folderId);
      const data = await getEmailsList({
        accessToken,
        nextPageToken,
        folderName,
      });
      // if()
      console.log("AKHO LIST DATA:::::::", data);
      for (let i = 0; i < data.messages?.length; i++) {
        let msg = {
          ...data.messages[i],
          databaseName,
          accessToken,
          userId,
          folderName,
          folderId,
        };
        msg.nextPageToken =
          i == data.messages.length - 1 ? data.nextPageToken : undefined;
        await useCases.kafka.kafkaProducer({
          topic: "listFetched",
          message: JSON.stringify(msg),
        });
      }
      if (data.nextPageToken) {
        await updateFolderSyncState({
          databaseName,
          userId,
          folderName,
          syncState: "FETCHING",
        });
      } else {
        await updateFolderSyncState({
          databaseName,
          userId,
          folderName,
          syncState: "FETCHED",
        });
        await useCases.kafka.kafkaProducer({
          topic: "foldersCreated",
          message: JSON.stringify({ userId, databaseName, accessToken }),
        });
      }
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
