const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send("working! 2023-07-10");
});

module.exports = router;
