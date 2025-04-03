const express = require("express");
const fs = require("fs");
const path = require("path");

const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage");
const { getProcessLog, getErrorLog } = require("../utils/logger");

const router = express.Router();

router.get("/add", (req, res) => {
  getProcessLog("Rendering add-product.html");

  res.status(STATUS_CODE.OK).sendFile(
    path.join(__dirname, "../views", "add-product.html")
  );
});

router.post("/add", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    getErrorLog(new Error("Brak danych w formularzu"));
    return res.status(STATUS_CODE.BAD_REQUEST).send("Wszystkie pola są wymagane.");
  }

  const data = `name: ${name}, description: ${description}`;

  fs.writeFile("product.txt", data, (err) => {
    if (err) {
      getErrorLog(err);
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Błąd zapisu pliku.");
    }

    getProcessLog("Zapisano nowy produkt.");
    res.status(STATUS_CODE.FOUND).redirect("/product/new");
  });
});

router.get("/new", (req, res) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err) {
      getErrorLog(err);
    } else {
      getProcessLog("Wczytano nowy produkt.");
    }

    const html = renderNewProductPage(data, !!err);
    res.status(STATUS_CODE.OK).send(html);
  });
});

module.exports = router;
