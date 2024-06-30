const express = require("express");
const connectDB = require("./db");
const router = require("./routes/userRoute");

const app = express();
const port = 3000;
require("dotenv").config();

connectDB();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/user", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
