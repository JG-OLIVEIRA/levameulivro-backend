const express = require("express");
const router = express.Router();
const exchangesController = require("../controllers/exchangesController");
const authorization = require("../middlewares/authorization");

router.get("/:id", exchangesController.getExchange);
router.post("/", authorization, exchangesController.create);
router.put("/:id", authorization, exchangesController.setStatus);

module.exports = router;
