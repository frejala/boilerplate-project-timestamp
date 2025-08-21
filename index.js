// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp microservice
app.get("/api/:date?", function (req, res) {
  var dateParam = req.params.date;

  // If no date param, return current time
  if (!dateParam) {
    var now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // If purely numeric, treat as milliseconds timestamp
  var isNumeric = /^-?\d+$/.test(dateParam);
  var dateObj;

  if (isNumeric) {
    // parse as integer (milliseconds)
    dateObj = new Date(parseInt(dateParam, 10));
  } else {
    // try parse as date string
    dateObj = new Date(dateParam);
  }

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
