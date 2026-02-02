// Required core modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Function to read and send html files
function sendHtmlFile(response, fileLocation, status = 200) {
  fs.readFile(fileLocation, "utf8", function (error, fileData) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Something went wrong");
    } else {
      response.writeHead(status, { "Content-Type": "text/html" });
      response.end(fileData);
    }
  });
}

// Creating server
const server = http.createServer(function (request, response) {
  let requestedUrl = request.url;

  // Handling css file
  if (requestedUrl === "/style.css") {
    const cssPath = path.join(__dirname, "public", "style.css");

    fs.readFile(cssPath, function (error, cssData) {
      if (error) {
        response.writeHead(500);
        response.end("CSS file not found");
      } else {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.end(cssData);
      }
    });
  }

  // Home page
  else if (requestedUrl === "/" || requestedUrl === "/home") {
    sendHtmlFile(
      response,
      path.join(__dirname, "pages", "home.html"),
      200
    );
  }

  // About page
  else if (requestedUrl === "/about") {
    sendHtmlFile(
      response,
      path.join(__dirname, "pages", "about.html"),
      200
    );
  }

  // Contact page
  else if (requestedUrl === "/contact") {
    sendHtmlFile(
      response,
      path.join(__dirname, "pages", "contact.html"),
      200
    );
  }

  // Page not found
  else {
    sendHtmlFile(
      response,
      path.join(__dirname, "pages", "404.html"),
      404
    );
  }
});

// Server port
const PORT = 3000;

server.listen(PORT, function () {
  console.log("Server is running at http://localhost:" + PORT);
});
