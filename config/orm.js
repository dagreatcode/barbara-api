// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

var connection = require("../config/connection");

var orm = {
//       // The last variable cb represents the anonymous function being passed from server.js
//   selectWhere: function(tableInput, colToSearch, valOfCol, cb) {
//     var queryString = "SELECT * FROM ?? WHERE ?? = ?";
//     connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
//       if (err) throw err;
//       cb(result);
//     });
//   } 
};

module.exports = orm;