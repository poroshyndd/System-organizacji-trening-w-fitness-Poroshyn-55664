const path = require("path");
res.sendFile(path.join(__dirname, "../views", "logout.html"));
  response.write("<html>");
  response.write("<head><title>Shop - Logout</title></head>");
  response.write("<body>");
  response.write("<h1>Logout</h1>");
  response.write(
    "<nav><a href='/'>Home</a><br /><a href='/kill'>Logout from application</a></nav>"
  );
  response.write("</body>");
  response.write("</html>");

  return response.end();
};

module.exports = { logoutRouting };
