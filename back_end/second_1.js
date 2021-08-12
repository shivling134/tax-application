const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// parse application/json
app.use(cors());
app.use(bodyParser.json());

//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
  user: "root",
  password: "Shiv@123",
  database: "classicmodels",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

// id int unique primary key,
//     name varchar (50) ,
//     rate int ,
//     quantity int,
//     discount int,
//     tax int

// creat a new Record
app.post("/api/create", (req, res) => {
	let data = { id: req.body.id, name: req.body.name, rate: req.body.rate, quantity:
                 
	req.body.quantity, discount: req.body.discount , tax: req.body.tax };
	let sql = "INSERT INTO tax1 SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});



// show all records
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM tax1";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});



// sum of all 
app.get("/api/total", (req, res) => {
	let sql = "SELECT * FROM tax1";
	
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ error: null, response: result }));
	});
});

// show a single record
app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM tax1 WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM tax1 WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

// update the Record
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE tax1 SET name='" + req.body.name + "', rate='" + req.body.rate + "', quantity='" + req.body.quantity + "', discount='" + req.body.discount + "', tax='" + req.body.tax + "', WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

app.listen(8000, () => {
	console.log("server started  port 8000...");
});


// insert into tax1 value (1, 'shiv', bhange, 'pune', 'logo192.png')