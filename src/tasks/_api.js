const express = require("express");
const controller = require("./controller");
const isAuth = require("../middleware/auth");
const { createTaskValidation, updateTaskValidation } = require("./validation");
const validation = require("../middleware/validation");

const router = express.Router();

router.get("/", isAuth, controller.getAllTasks);
router.get("/:id", isAuth, controller.getByIdTask);
router.post(
  "/",
  isAuth,
  createTaskValidation(),
  validation,
  controller.createTask
);
router.put(
  "/:id",
  isAuth,
  updateTaskValidation(),
  validation,
  controller.updateTask
);
router.delete("/:id", isAuth, controller.removeTask);

module.exports = router;
