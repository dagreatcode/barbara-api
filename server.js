const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const connection = require("./config/connection");
// const orm = require("./config/orm");
// TODO: Take in info from user
// const itemName = ("#name");
// const binLocation = ("#bin-location");
// const itemDescription = ("#description");
// const itemImage = ("#img");
// const routes = require("./controllers/retroluxeController.js");

// Create instance of express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku + 3001;
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory. css/js.
app.use(express.static("public"));
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Routes
// app.use(routes);

// MySQL DB Connection Information (remember to change this with our specific credentials)
// This was moved to connection.js
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "retroluxe_db",
// });

// // Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Config test api route. If true, it works.
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// // My ORM
// var orm = {
//     selectWhere: function(name, bin_location, description, cb) {
//     // var queryString = "SELECT * FROM ?? WHERE ?? = ?";
//     var queryString = "SELECT * FROM ??";
//     connection.query(queryString, [name, bin_location, description], function(err, result) {
//       if (err) throw err;
//       cb(result);
//     });
//   }
// }
// orm.selectWhere("poohmadeit", "name", "bin_location", "description", function(result) {
//   var data = result;
//   console.log(data);
// });

// TODO: Move all CRUD routes inside of this, Then move all CRUD to the config/orm.js /route.js
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

// POST
// C
// Create everything
app.post("/api/poohmadeit", (req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO poohmadeit (name, bin_location, description, img) VALUES (?,?,?,?)",     
    [
     req.body.name,
     req.body.bin_location,
     req.body.description,
     req.body.img,

   ], (err, data) => {
      if (err) {
         return res.status(500).end();
      }
      // res.json({
      //   error: false,
      //   data: null,
      //   message: "Wrote data to poohmadeit.",
      // })
      console.table(data);
      res.redirect("/");
  });
});
app.post("/api/retroluxe", function (req, res) {
  console.log(req.body);
  connection.query(
    `INSERT INTO retroluxe (name, bin_location, description, img) VALUES (?,?,?,?)`,
    [
      req.body.name,
      req.body.bin_location,
      req.body.description,
      req.body.img,
      req.params.id

    ],
    function (err, result) {
      if (err) {
        return res.status(500).end();
      }
      // Send back the ID of the new name
      // res.json({
      //   error: false,
      //   data: null,
      //   message: "Wrote data to retroluxe.",
      // });
      console.table(result);
      res.redirect("/");
    });
});
// GET
// R
// Read a name
app.get("/", function (req, res) {
  connection.query("SELECT * FROM poohmadeit", (err, data) => {
     if (err) {
       return res.status(500).send("Error occurred");
     }
     console.table(data);
     res.render("index", {
       myName: "Barbara Kendrick",
       chatSay: "Great to see you again.",
     });
   });
 });
app.get("/:id", function (req, res){
  connection.query(`SELECT * FROM retroluxe WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).end();
    }

      res.render("database", {retroluxe: result});
  })
})
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
        html += "<p>description: " + result[i].description + "</p>";
        html += "<p>img: " + result[i].description + "</p></li>";
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
        html += "<p>description: " + result[i].description + "</p>";
        html += "<p>img: " + result[i].img + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
  );
});
app.get("/retroluxe", function (req, res) {
  connection.query(
    "SELECT * FROM retroluxe ORDER BY bin_location",
    function (err, result) {
      if (err) throw err;

      let html = "<h1>Retro Luxe</h1>";

      html += "<ul>";

      for (let i = 0; i < result.length; i++) {
        // html += "<li><p> ID: " + result[i].id + "</p>";
        // html += "<p> Name: " + result[i].name + "</p>";
        // html += "<p> bin_location: " + result[i].bin_location + "</p>";
        // html += "<p>description: " + result[i].description + "</p></li>";
        html =
          html +
          `<p>${result[i].id} - ${result[i].name} - ${result[i].bin_location} - ${result[i].description} - ${result[i].img}</p>`;
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
        html = html + "<p> Name: " + result[i].name + "</p>";
        html += "<p> bin_location: " + result[i].bin_location + "</p>";
        html += "<p>description: " + result[i].description + "</p>";
        html += "<p>img: " + result[i].img + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
  );
});
// PUT
// U
// Update a name
app.put("/api/item/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  connection.query(
    `UPDATE retroluxe
    SET name = ?, bin_location = ?, description = ?, img = ?
    WHERE id = ?`,
    [
      req.body.name,
      req.body.bin_location,
      req.body.description,
      req.body.img,
      req.params.id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).end();
      }
      // Send back the ID of the new name
      // res.json({
      //   error: false,
      //   data: null,
      //   message: "Wrote data to retroluxe.",
      // });
      res.redirect("/");
    });
});
// DELETE
// D
// // Delete a name
// app.delete("/api/item", function(req, res) {
//   console.log(req.params.id)
//   connection.query("DELETE FROM retroluxe WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//           // Send back the ID of the new name
//       res.status(200).end();
//       });
//     // res.status(200).end();


// });



// Create a new data
// app.post("/api/retroluxe", (req, res) => {
//   console.table(req.body);
//   connection.query(`INSERT INTO retroluxe (${itemName}, ${bin_location}, ${description}, ${img}, timestamp) VALUES ("More Stuff", 3, "almost done", ?, ?)`, [req.body.name, req.body.bin_location, req.body.description, req.body.img, req.body.timestamp, req.params.id], (err, data) => {
//       if (err) {
//         throw err;
//       }
//       res.redirect("/");
//   //     res.json({
//   //       error: false,
//   //       data: null,
//   //       message: "Wrote data to retroluxe.",
//   //     })
//     })

// });
// -------------



// TODO: Bring all view routes here. Then move to orm.
// Views Routes
// Use Handlebars to render the main index.html page with the data in it.
// app.get("/", (req, res) => {
//   connection.query("SELECT * FROM retroluxe", (err, data) => {
//     // const show = retroluxe.filter(luxe => luxe.description);
//     console.table(data);
//     res.render("index", {bin_location: data[0].bin_location, description: data[0].description, name: data[0].name, myName: "Barbara Kendrick", chatSay: "Great Day"});

//     // res.render("index", {retroluxe: data[1].name, myName: "Barbara Kendrick", name: "Great Day"});
//     // res.render("index", { poohmadeit: data[0].name });
//   });
//   // res.json(path.join(__dirname, "public/index.html"));
// });
// app.get("/", function (req, res) {
//   // res.json(path.join(__dirname, "public/index.html"));
//   res.send(`<h1>Home Page</h1>`);
// });






// app.get("/item", function (req, res) {
//   connection.query("SELECT * FROM retroluxe", (err, data) => {
//     if (err) {
//       return res.status(500).send("Error occurred");
//     }
//       console.table(data);
//       res.render("update", {retroluxe: data});
//   });
// });

// app.get("/", function (req, res) {
//   connection.query("SELECT * FROM retroluxe", (eer, result) => {
//     console.table(result);
// //    res.render("index", { retroluxe: result[0]});
//   });
// });

// app.get("/database/:bin", function (req, res) {
//   connection.query(
//     "SELECT * FROM poohmadeit",
//     function (err, result) {
//       if (err) throw err;
//       for (let i = 0; i < poohmadeit.length; i++) {
//         if (poohmadeit[i].bin_location === req.params.bin_location){
//           console.log(poohmadeit[i]);
//           res.render("database", {
//             // poohmadeit[i]
//             name: poohmadeit[i].name,
//             bin_location: poohmadeit[i].bin_location,
//             description: poohmadeit[i].description
//             })
//         }
//       }
//     });
// });

// res.json(path.join(__dirname, "public/index.html"));
// res.send(`<h1>New Data Here</h1>`);

// app.get("/database", function (req, res) {
//     connection.query("SELECT * FROM poohmadeit", (eer, data) => {
//       for (let i = 0; i < data.length; i++) {
//         console.log(data[i]);
//         res.render("database", {poohmadeit: data[i]});
//       };
//     });
// });

// app.get("/database", function (req, res) {
//   connection.query("SELECT * FROM retroluxe", (eer, data) => {
//     for (let i = 0; i < data.length; i++) {
//       console.log(data[i]);
//       res.render("database", {retroluxe: data[i]});
//     };
//   });
// });

// app.get("/new", function (req, res) {
//   // res.json(path.join(__dirname, "public/index.html"));
//   res.send(`<h1>New Data Here</h1>`);
// });

// app.get("edit/:id", function (req, res) {
//   // res.json(path.join(__dirname, "public/index.html"));
//   res.send(`<h1>Edit Data Here</h1>`);
// });

// Render Page you are pulling
// app.get("/index", function(req, res) {
//     connection.query("SELECT * FROM poohmadeit WHERE name", function(err, result) {
//         if (err) throw err;
//         res.render("index", );
//     });
// });

//-----------------------------------------------



// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});
