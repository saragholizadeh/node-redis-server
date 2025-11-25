const express = require("express");
const router = express.Router();
const controller = require("./docs.controller");

router.get("/", controller.getDocs);

module.exports = router;
