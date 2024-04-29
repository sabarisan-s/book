const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routers/bookRoute"));

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e.message, "Database Not Connected");
    });

const port = 8000 || process.env.PORT;
app.listen(port, (e) => {
    if (e) throw e.message;
    console.log(port, "Server is Running");
});
