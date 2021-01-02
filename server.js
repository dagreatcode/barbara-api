var express = require("express");
var mysql = require("mysql");

// Create instance of express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku + 3001;
var PORT = process.env.PORT || 3001;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "retroluxe_db"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
    res.send(`<h1>Best Database</h1>`);
  });

// Routes
app.get("/poohmadeit", function(req, res) {
  connection.query("SELECT * FROM poohmadeit ORDER BY id", function(err, result) {
    if (err) throw err;
    
    var html = "<h1>Pooh Made It</h1>";

    html += "<ul>";

    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p> Name: " + result[i].name + "</p>";
      html += "<p> bin_location: " + result[i].bin_location + "</p>";
      html += "<p>description: " + result[i].description + "</p></li>";
    }

    html += "</ul>";

    res.send(html);
  });
});

app.get("/retroluxe", function(req, res) {
  connection.query("SELECT * FROM retroluxe ORDER BY bin_location DESC", function(err, result) {
    if (err) throw err;

    var html = "<h1>Retro Luxe</h1>";

    html += "<ul>";

    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p> Name: " + result[i].name + "</p>";
      html += "<p> bin_location: " + result[i].bin_location + "</p>";
      html += "<p>description: " + result[i].description + "</p></li>";
    }

    html += "</ul>";

    res.send(html);
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
