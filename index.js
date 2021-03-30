const express = require('express');


const app = express();
const port = 8000;

var mysql = require('mysql');

var connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "Quba$401",
   database: ""
});

app.use(express.json());
app.use(express.urlencoded({
   extended: true
}));

const defaultResponse = [10, 29, 15, 20, 50]

const mergeArrays = (arr1, arr2) => {
   //MergeSort 
   let sorted = [];

   while (arr1.length && arr2.length) {
      if (arr1[0] < arr2[0]) {
         sorted.push(arr1.shift());
      }
      else {
         sorted.push(arr2.shift());
      }
   };

   return sorted.concat(arr1.slice().concat(arr2.slice()));
}

connection.connect(function (err) {
   if (err) throw err;
   console.log("Connected")
});

app.get('/', function (req, res) {
      var sql = "SELECT * FROM myschema.sortedlist;";
      connection.query(sql, function (err, result) {
         if (err) throw err;
         res.send(result);
      });
});

app.post('/sortMe', function (req, res) {
   const arr1 = Array.from(req.body.Array1);
   const arr2 = Array.from(req.body.Array2);
   const sorted = mergeArrays(arr1, arr2);
      var sql = "INSERT INTO `myschema`.`sortedlist` (`leftArray`, `rightArray`, `SortedList`) VALUES ('" + JSON.stringify(req.body.Array1) + "', '" + JSON.stringify(req.body.Array2) + "' , '" + JSON.stringify(sorted) + "')";
      connection.query(sql, function (err, result) {
         if (err) throw err;
         res.send(`Success`);
   });
});

app.listen(port, () => {
   console.log('Listening on port ' + port);
});


