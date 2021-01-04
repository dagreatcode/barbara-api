const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const connection = require("./config/connection");
const orm = require("./config/orm");

// Create instance of express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku + 3001;
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// MySQL DB Connection Information (remember to change this with our specific credentials)
// This was moved to connection.js
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "retroluxe_db"
// });

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Config test
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

//Full CRUD API Routes

// // Create
// app.post("/api/poohmadeit", (req,res) => {

// });

// // Read
// app.get("/api/poohmadeit", (req,res) => {

// });

// app.get("/api/poohmadeit/:id", (req,res) => {

// });

// // Update
// app.put("/api/poohmadeit/:id", (req,res) => {

// });

// // Delete
// app.delete("/api/poohmadeit/:id", (req,res) => {

// });

// // Create
// app.post("/api/retroluxe", (req,res) => {

// });

// // Read
// app.get("/api/retroluxe", (req,res) => {

// });

// app.get("/api/retroluxe/:id", (req,res) => {

// });

// // Update
// app.put("/api/retroluxe/:id", (req,res) => {

// });

// // Delete
// app.delete("/api/retroluxe/:id", (req,res) => {

// });

app.post("/api/retroluxe", (req, res) => {
  console.log(req.body);
  connection.query(`INSERT INTO retroluxe (name, bin_location, description) VALUES ("New Item", 0, "relaxed")`, [req.body.name], (err, data) => {
      if (err) {
        throw err;
      }
      res.redirect("/");
  //     res.json({
  //       error: false,
  //       data: null,
  //       message: "Wrote data to retroluxe.",
  //     })
    })
});

// Views Routes
app.get("/", (req, res) => {
  connection.query("SELECT * FROM poohmadeit", (eer, data) => {
    console.table(data);
    res.render("index", { myName: "Barbara Kendrick", name: "Great Day" });
    // res.render("index", { poohmadeit: data[0].name });
  });
  // connection.query("SELECT * FROM poohmadeit", (eer, data) => {
  //   console.table(data);
  // });
  // res.json(path.join(__dirname, "public/index.html"));
});

app.get("/new", function (req, res) {
  // res.json(path.join(__dirname, "public/index.html"));
  res.send(`<h1>New Data Here</h1>`);
});

app.get("edit/:id", function (req, res) {
  // res.json(path.join(__dirname, "public/index.html"));
  res.send(`<h1>Edit Data Here</h1>`);
});

// Render Page you are pulling
// app.get("/index", function(req, res) {
//     connection.query("SELECT * FROM poohmadeit WHERE name", function(err, result) {
//         if (err) throw err;
//         res.render("index", );
//     });
// });

app.get("/poohmadeit", function (req, res) {
  connection.query(
    "SELECT * FROM poohmadeit ORDER BY id",
    function (err, result) {
      if (err) throw err;

      let html = "<h1>Pooh Made It</h1>";

      html += "<ul>";

      for (let i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p> Name: " + result[i].name + "</p>";
        html += "<p> bin_location: " + result[i].bin_location + "</p>";
        html += "<p>description: " + result[i].description + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
  );
});

app.get("/poohmadeit/:bin", function (req, res) {
  connection.query(
    "SELECT * FROM poohmadeit WHERE bin_location = ?",
    [req.params.bin],
    function (err, result) {
      if (err) throw err;

      let html = "<h1>Bin's " + req.params.bin + "</h1>";

      html += "<ul>";

      for (let i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p> Name: " + result[i].name + "</p>";
        html += "<p> bin_location: " + result[i].bin_location + "</p>";
        html += "<p>description: " + result[i].description + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
  );
});

app.get("/retroluxe", function (req, res) {
  connection.query(
    "SELECT * FROM retroluxe ORDER BY bin_location DESC",
    function (err, result) {
      if (err) throw err;

      let html = "<h1>Retro Luxe</h1>";

      html += "<ul>";

      for (let i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p> Name: " + result[i].name + "</p>";
        html += "<p> bin_location: " + result[i].bin_location + "</p>";
        html += "<p>description: " + result[i].description + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
  );
});

app.get("/retroluxe/:bin", function (req, res) {
  connection.query(
    "SELECT * FROM retroluxe WHERE bin_location = ?",
    [req.params.bin],
    function (err, result) {
      if (err) throw err;

      let html = "<h1>Bin's " + req.params.bin + "</h1>";

      html += "<ul>";

      for (let i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p> Name: " + result[i].name + "</p>";
        html += "<p> bin_location: " + result[i].bin_location + "</p>";
        html += "<p>description: " + result[i].description + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
  );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});
