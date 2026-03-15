// importing required modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// helper function to load and send html files
function sendHtmlFile(res, filePath, statusCode = 200) {

  fs.readFile(filePath, "utf8", function(err, data) {

    if (err) {
      // if file cannot be read
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error while loading page");
      return;
    }

    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(data);
  });

}

// create http server
const server = http.createServer(function(req, res) {

  const url = req.url;

  // serving css file
  if (url === "/style.css") {

    const cssFile = path.join(__dirname, "public", "style.css");

    fs.readFile(cssFile, function(err, data) {

      if (err) {
        res.writeHead(500);
        res.end("Unable to load CSS");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);

    });

  }

  // home route
  else if (url === "/" || url === "/home") {

    const homePath = path.join(__dirname, "pages", "home.html");
    sendHtmlFile(res, homePath, 200);

  }

  // about route
  else if (url === "/about") {

    const aboutPath = path.join(__dirname, "pages", "about.html");
    sendHtmlFile(res, aboutPath, 200);

  }

  // contact route
  else if (url === "/contact") {

    const contactPath = path.join(__dirname, "pages", "contact.html");
    sendHtmlFile(res, contactPath, 200);

  }

  // if route does not exist
  else {

    const notFoundPath = path.join(__dirname, "pages", "404.html");
    sendHtmlFile(res, notFoundPath, 404);

  }

});

// server port
const PORT = 3000;

// start server
server.listen(PORT, function() {
  console.log("Server running at http://localhost:" + PORT);
});