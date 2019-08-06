var assert = require("chai").assert,
	expect = require("chai").expect,
    should = require("chai").should();


describe("Simple Testing", function(){

	before("Before", function(){
		console.log("** before ** ")
	})
	beforeEach("Before Each", function(){
		console.log("** beforeEach **")
	})
	after("After", function(){
		console.log("** After **")
	})
	afterEach("After Each", function(){
		console.log("** afterEach **")
	})	


	it("should return true", function(){
		var name ="koijam";

		expect(name).to.be.string;
		expect(name).to.be.equal("koijam");
	});
	
})

