const express = require("express");
const passportService = require("../util/passport");
const auth = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, title: "REST API Interface" });
});

router.use("/v01/auth", auth);
// router.use("other", route);
// router.use("other", route);

module.exports = router;
