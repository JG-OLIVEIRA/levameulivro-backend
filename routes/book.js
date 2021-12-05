const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const authorization = require("../middlewares/authorization");

router.post("/", authorization, booksController.create);
router.get("/", booksController.readAll);
router.put("/:id", authorization, booksController.updateById);
router.delete("/:id", authorization, booksController.destroyById);

module.exports = router;
