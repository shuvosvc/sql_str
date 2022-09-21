const express = require("express");

const authControllers = require("../controllers/auth");
const authMiddlewares = require("../middlewares/auth");
const requireAuth = authMiddlewares.requireAuth;
const validateMiddleware = require("../middlewares/validate");

const validateRegister = require("../validations/authority/register");
const validateLogin = require("../validations/authority/login");
const validateUpdate = require("../validations/authority/update");

const router = express.Router();

router.post(
  "/create",
  requireAuth,
  validateMiddleware(validateRegister),
  authControllers.create
);

router.put(
  "/update/:id",
  requireAuth,
  validateMiddleware(validateUpdate),
  authControllers.update
);

router.delete("/delete/:id", requireAuth, authControllers.delete);

router.post("/login", validateMiddleware(validateLogin), authControllers.login);

module.exports = router;
