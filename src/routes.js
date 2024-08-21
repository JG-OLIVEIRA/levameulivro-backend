const routes = require("express").Router();

const UserController = require("./app/controllers/UserController");
const BookController = require("./app/controllers/BookController");

const auth = require("./app/middleware/auth");

routes.post("/users", UserController.store);
routes.post("/books", auth, BookController.store);

module.exports = routes;