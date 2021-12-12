const router = require("express").Router();
const booksController = require("../controllers/booksController");
const authorization = require("../middlewares/authorization");
const validator = require("../middlewares/validator");
const {
  configUpdate,
  configCreate,
} = require("../utils/config/middlewares/bookValidator");

// authorization routers

router.post(
  "/",
  configCreate,
  validator,
  authorization,
  booksController.create
);
router.put(
  "/:id",
  configUpdate,
  validator,
  authorization,
  booksController.updateByUserId
);
router.delete("/:id", authorization, booksController.deleteByUserId);
router.delete("/", authorization, booksController.deleteAllByUserId);

// public routers

router.get("/", booksController.getAll);
router.get("/search", booksController.getByNameOrAuthorOrISBN);
router.get("/:id", booksController.getById);

module.exports = router;
