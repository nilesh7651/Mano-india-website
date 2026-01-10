const express = require("express");
const router = express.Router();

const { listPublicThemes } = require("../controllers/themeController");

router.get("/", listPublicThemes);

module.exports = router;
