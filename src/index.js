const express = require("express");
let port = 5000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const restServices = require("./rest-service");

app.use("/", restServices);
app.listen(port, () => {
  console.log("Listening on port: " + port);
});
