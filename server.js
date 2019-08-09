const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./model/employee");
const bodyParser = require("body-parser");
const app = express();

const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.connect("mongodb://mongo:37001/resetapidata", function() {
	console.log("Connected to Database")
})

router.get("/", function(req, res){
	res.send({message: "Hello World"})
});

router.get("/employee", function(req, res){
	Employee.getEmployee(function(err, employee) {
		if(err) {
			throw err;
		}
		console.log(employee);
		res.json(employee);
	})

});

router.post("/employee", function(req, res) {
	var body = req.body;
	console.log(body);
	Employee.addEmployee(body, function(err, employee) {
		if(err){
			throw err;
		}
		res.json(employee);
	})

})

router.put("/employee/:id", function(req, res) {
	var id = req.params.id;
	var body = req.body;

	Employee.updateEmployee(id, body, function(err, employee) {
		if(err){
			throw err;
		}
		res.json(employee);
	})

})

router.delete("/employee/:id", function(req, res) {
	var id = req.params.id;
	Employee.removeEmployee(id, function(err, employee) {
		if(err){
			throw err;
		}
		res.json(employee);
	})
})

app.use("/", router);

var PORT = process.env.PORT || 3000;

app.listen(PORT , function() {
	console.log("Server is listening at port " + PORT);
})

module.exports = app;