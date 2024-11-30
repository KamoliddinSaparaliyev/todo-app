const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", require("./src/auth/_api"));
app.use("/posts", require("./src/tasks/_api"));

app.use((req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use(require("./src/handlers/errosHandler"));

const port = process.env.PORT || 3000;

const dbConnect = require("./conf/db");

dbConnect
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Some connection error", err);
    process.exit();
  });
