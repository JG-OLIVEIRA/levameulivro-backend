const router = require("express").Router();
const usersController = require("../controllers/usersController");
const authorization = require("../middlewares/authorization");
const validator = require("../middlewares/validator");
const {
  configUpdate,
  configSignIn,
  configSignUp,
} = require("../utils/config/middlewares/userValidator");

// authorization routers

router.get("/books", authorization, usersController.getMyBooks);
router.get("/exchanges", authorization, usersController.getMyExchanges);
router.put(
  "/",
  configUpdate,
  validator,
  authorization,
  usersController.updateAccount
);
router.delete("/", authorization, usersController.deleteAccount);

// public routers
router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/signin", configSignIn, validator, usersController.initSession);
router.post("/signup", configSignUp, validator, usersController.createAccount);

module.exports = router;
