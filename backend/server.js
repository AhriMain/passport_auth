require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./helpers/mongoDBcon");

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cookie-parser")());

// routes
app.use("/api/auth", require("./routes/auth.routes"));

connectDb(app);
