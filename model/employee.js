var mongoose = require("mongoose");
var employeeSchema = mongoose.Schema({
	name :{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}

});

var Employee = module.exports = mongoose.model("employee", employeeSchema,"employees");

module.exports.getEmployee = function(callback){
	Employee.find(callback);
}

module.exports.addEmployee = function(employee, callback){
	Employee.create(employee, callback);
}

module.exports.updateEmployee = function(id, body, callback){
	Employee.update({_id: id}, body, callback)
}

module.exports.removeEmployee = function(id, callback){
	Employee.remove({_id: id}, callback)
}