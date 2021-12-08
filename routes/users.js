const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const usersValidator = require("../middlewares/usersValidator");

router.get("/", usersController.read);
router.get("/books", authorization, usersController.getAllBooks);
router.post(
  "/",
  [
    body("firstName").isLength({ min: 3 }),
    body("lastName").isLength({ min: 3 }),
    body("email").isEmail().withMessage("o email precisa ser válido"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("a senha precisa ter no mínimo 8 caracteres"),
    body("birthDate").isDate().withMessage("digite uma data válida"),
    body("zipCode").isNumeric().isLength({ min: 8 }),
  ],
  usersValidator,
  usersController.create
);
router.put(
  "/",
  [
    body("firstName").isLength({ min: 3 }),
    body("lastName").isLength({ min: 3 }),
    body("email").isEmail().withMessage("o email precisa ser válido"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("a senha precisa ter no mínimo 8 caracteres"),
    body("birthDate").isDate().withMessage("digite uma data válida"),
    body("zipCode").isNumeric().isLength({ min: 8 }),
  ],
  usersValidator,
  authorization,
  usersController.update
);
router.delete("/", authorization, usersController.destroy);

module.exports = router;
