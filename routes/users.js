const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authorization = require("../middlewares/authorization");

router.post("/", usersController.create);
router.get("/", usersController.read);
router.get("/books", authorization, usersController.getAllBooks);
router.put("/", authorization, usersController.update);
router.delete("/", authorization, usersController.destroy);

module.exports = router;
