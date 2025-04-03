/* 🏗 Structo the Builder */
/* Funkcja generująca stronę HTML z najnowszym produktem */
const renderNewProductPage = (productData, hasError) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Shop - Newest product</title>
    </head>
    <body>
      <h1>Newest product</h1>
      <nav>
        <a href="/">Home</a><br />
        <a href="/product/add">Add product</a><br />
        <a href="/logout">Logout</a>
      </nav>
      <main>
        ${
          hasError
            ? "<br /><div>No new products available.</div>"
            : `<br /><div>New product data - ${productData}</div>`
        }
      </main>
    </body>
    </html>
  `;
};

module.exports = renderNewProductPage;
