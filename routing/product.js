const fs = require("fs");
const path = require("path");
const { STATUS_CODE } = require("../constants/statusCode");
const { getProcessLog, getErrorLog } = require("../utils/logger");

const productRouting = (request, response) => {
  const { url, method } = request;

  if (url.includes("add") && method === "GET") {
    return renderAddProductPage(response);
  }

  if (url.includes("add") && method === "POST") {
    return addNewProduct(request, response);
  }

  if (url.includes("new")) {
    return renderNewProductPage(response);
  }

  getErrorLog(new Error(`Nieobsługiwana ścieżka: ${url}`));
  response.statusCode = STATUS_CODE.NOT_FOUND;
  return response.end("404 - Not Found");
};

const renderAddProductPage = (response) => {
  const filePath = path.join(__dirname, "../views", "add-product.html");
  response.statusCode = STATUS_CODE.OK;
  response.setHeader("Content-Type", "text/html");
  getProcessLog("Rendering add-product page");
  return response.sendFile ? response.sendFile(filePath) : fs.createReadStream(filePath).pipe(response);
};

const renderNewProductPage = (response) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Shop - Newest product</title></head>");
    response.write("<body>");
    response.write("<h1>Newest product</h1>");
    response.write(
      "<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>"
    );

    if (err) {
      getErrorLog(err);
      response.write("<br /><div>No new products available.</div>");
    } else {
      getProcessLog("Displaying newest product");
      response.write(`<br /><div>New product data - ${data}</div>`);
    }

    response.write("</body>");
    response.write("</html>");

    return response.end();
  });
};

const addNewProduct = (request, response) => {
  const body = [];
  request.on("data", (chunk) => {
    body.push(chunk);
  });
  request.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");
      return `${key}: ${decodeURIComponent(value)}`;
    });

    const content = formData.join(", ");

    fs.writeFile("product.txt", content, (err) => {
      if (err) {
        getErrorLog(err);
        response.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
        return response.end("Błąd zapisu produktu.");
      }

      getProcessLog("Produkt został zapisany");
      response.statusCode = STATUS_CODE.FOUND;
      response.setHeader("Location", "/product/new");
      return response.end();
    });
  });
};

module.exports = { productRouting };
