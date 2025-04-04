const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config");
const { getInfoLog, getErrorLog } = require("./utils/logger");

const productRoutes = require("./routing/product");
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");
const { STATUS_CODE } = require("./utils/constants"); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  getInfoLog(req);
  next();
});

app.use("/product", productRoutes);
app.use("/logout", logoutRoutes);
app.use("/kill", killRoutes);
app.use("/", homeRoutes);

// Obsługa strony 404
app.use((req, res) => {
  res.status(STATUS_CODE.NOT_FOUND);
  res.sendFile(path.join(__dirname, "views", "404.html"));
  getErrorLog(new Error(`Nie znaleziono ścieżki: ${req.url}`));
});

// Start serwera
app.listen(config.PORT, () => {
  console.log(`Serwer działa na porcie ${config.PORT}`);
});
