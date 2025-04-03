const express = require("express");
const router = express.Router();

const { getProcessLog } = require("../utils/logger");

router.get("/", (req, res) => {
  getProcessLog("Zamykanie procesu aplikacji na żądanie /kill");

  res.send("Serwer został zatrzymany.");
  
  setTimeout(() => {
    process.exit();
  }, 100);
});

module.exports = router;

