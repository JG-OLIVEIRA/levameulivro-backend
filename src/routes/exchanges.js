const router = require("express").Router();
const exchangesController = require("../controllers/exchangesController");
const authorization = require("../middlewares/authorization");

// authorization routers
router.post("/books/:id", authorization, exchangesController.create);
router.put("/:id/setstatus", authorization, exchangesController.setStatusById);
router.put(
  "/:id/setrequest",
  authorization,
  exchangesController.setRequestById
);
router.delete("/:id", authorization, exchangesController.deleteById);

// public routers

router.get("/:id", exchangesController.getById);
router.get("/", exchangesController.getAll);

module.exports = router;
