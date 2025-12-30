const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/:shortId", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/view.html"));
});

module.exports = router;
