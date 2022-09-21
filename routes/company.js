const express = require("express");

const companyControllers = require("../controllers/company");
const authMiddlewares = require("../middlewares/auth");
const requireAuth = authMiddlewares.requireAuth;
const validateMiddleware = require("../middlewares/validate");

const validateCompany = require("../validations/company/create");
const validateUpdateCompany = require("../validations/company/update");

const router = express.Router();

router.post(
  "/create",
  requireAuth,
  validateMiddleware(validateCompany),
  companyControllers.createCompany
);
router.get("/getAll", requireAuth, companyControllers.getAllCommpany);
router.put(
  "/update/:_id",
  requireAuth,
  validateMiddleware(validateUpdateCompany),
  companyControllers.updateCompany
);

module.exports = router;
