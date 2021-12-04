const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const authorization = require("../middlewares/authorization");

router.post("/", authorization, booksController.create);
router.get("/", authorization, booksController.read);
router.put("/", authorization, booksController.update);
router.delete("/", authorization, booksController.destroy);

module.exports = router;
