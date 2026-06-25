var http = require("http");
var fs = require("fs");
var path = require("path");

var PORT = 3000; // change this if 3000 is busy on ur machine

// tried using express first but decided to just use http module directly
// kept it simple for now

var server = http.createServer(function(req, res) {

    var url = req.url;
    console.log("got request -> " + url);

    // css file handle karna padega warna styling nahi aayegi
    if (url == "/style.css") {
        var cssPath = path.join(__dirname, "public", "style.css");
        fs.readFile(cssPath, function(err, data) {
            if (err) {
                res.writeHead(404);
                res.end("css not found, check public folder");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
        return;
    }

    // now handle the actual pages
    var filePath = "";
    var statusCode = 200;

    if (url == "/" || url == "/home") {
        filePath = path.join(__dirname, "pages", "home.html");
    } else if (url == "/about") {
        filePath = path.join(__dirname, "pages", "about.html");
    } else if (url == "/contact") {
        filePath = path.join(__dirname, "pages", "contact.html");
    } else {
        // nothing matched so 404 page
        filePath = path.join(__dirname, "pages", "404.html");
        statusCode = 404;
    }

    // read the html file and send it
    fs.readFile(filePath, function(err, data) {
        if (err) {
            // this happens if html file is missing from pages folder
            console.log("file missing: " + filePath);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 - something went wrong on server side");
            return;
        }
        res.writeHead(statusCode, { "Content-Type": "text/html" });
        res.end(data);
    });

});

server.listen(PORT, function() {
    console.log("server running on http://localhost:" + PORT);
    console.log("press ctrl+c to stop");
});
