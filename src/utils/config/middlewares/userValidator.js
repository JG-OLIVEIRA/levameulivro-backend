const { body } = require("express-validator");

const configSignIn = [
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("o email precisa ser válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("a senha precisa ter no mínimo 8 caracteres"),
];

const configSignUp = [
  body("firstName").not().isEmpty().isLength({ min: 3 }),
  body("lastName").not().isEmpty().isLength({ min: 3 }),
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("o email precisa ser válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("a senha precisa ter no mínimo 8 caracteres"),
  body("birthDate")
    .isDate()
    .not()
    .isEmpty()
    .withMessage("digite uma data válida"),
  body("zipCode").isNumeric().isLength({ min: 8 }),
];

const configUpdate = [
  body("firstName").not().isEmpty().isLength({ min: 3 }),
  body("lastName").not().isEmpty().isLength({ min: 3 }),
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("o email precisa ser válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("a senha precisa ter no mínimo 8 caracteres"),
  body("birthDate")
    .isDate()
    .not()
    .isEmpty()
    .withMessage("digite uma data válida"),
  body("zipCode").isNumeric().isLength({ min: 8 }),
];

module.exports = { configSignIn, configSignUp, configUpdate };
