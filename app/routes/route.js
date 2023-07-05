const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send(process.env.NODE_ENV + " : working! 2023-07-05");
});

module.exports = router;
