const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");
const validator = require("../middlewares/validator");

router.get("/", booksController.readAll);
router.get("/search", booksController.getByNameOrAuthorOrISBN);
router.get("/:id", booksController.getById);
router.post(
  "/",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("o nome do livro precisa ter pelo menos 3 cacteres"),
    body("author")
      .isLength({ min: 3 })
      .withMessage("o nome do autor precisa ter pelo menos 3 cacteres"),
    body("isbn")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("o código ISBN precisa ser válido"),
    body("description")
      .isLength({ min: 15 })
      .withMessage("a descrição do livro precisa ter pelo menos 15 caracteres"),
  ],
  validator,
  authorization,
  booksController.create
);
router.put("/:id", authorization, booksController.updateById);
router.delete("/:id", authorization, booksController.destroyById);

module.exports = router;
