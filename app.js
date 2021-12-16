const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const usersRouter = require("./src/routes/users");
const booksRouter = require("./src/routes/book");
const exchangesRouter = require("./src/routes/exchanges");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/exchanges", exchangesRouter);

module.exports = app;
