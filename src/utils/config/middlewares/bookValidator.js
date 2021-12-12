const { body } = require("express-validator");

const configCreate = [
  body("name")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("o nome do livro precisa ter pelo menos 3 cacteres"),
  body("author")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("o nome do autor precisa ter pelo menos 3 cacteres"),
  body("isbn")
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("o código ISBN precisa ser válido"),
  body("description")
    .not()
    .isEmpty()
    .isLength({ min: 15 })
    .withMessage("a descrição do livro precisa ter pelo menos 15 caracteres"),
];

const configUpdate = [
  body("name")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("o nome do livro precisa ter pelo menos 3 cacteres"),
  body("author")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("o nome do autor precisa ter pelo menos 3 cacteres"),
  body("isbn")
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("o código ISBN precisa ser válido"),
  body("description")
    .not()
    .isEmpty()
    .isLength({ min: 15 })
    .withMessage("a descrição do livro precisa ter pelo menos 15 caracteres"),
];

module.exports = { configCreate, configUpdate };
