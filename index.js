// init project
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  var dateParam = req.params.date;

  if (!dateParam) {
    var now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  var isNumeric = /^-?\d+$/.test(dateParam);
  var dateObj;

  if (isNumeric) {
    dateObj = new Date(parseInt(dateParam, 10));
  } else {
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
