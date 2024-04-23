const { Kafka } = require("kafkajs");
const dbs = require("../../data-access").cockroach;
const makeKafkaProducer = require("./kafka-producer");
const kafkaProducer = makeKafkaProducer({
  Kafka,
  checkIfMessageExists: dbs.kafkaTopicsDb.topicsDb.checkIfMessageExists,
  insertTopicIntoDb: dbs.kafkaTopicsDb.topicsDb.insertTopicIntoDb,
});

module.exports = {
  kafkaProducer,
};
