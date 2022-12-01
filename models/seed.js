///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection")// this connection is alreate connected to the data base
const Fruit = require("./fruit")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected
mongoose.connection.on("open", () => {


        //define data we want to put in the database
    const startingFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]
 
    // Delete all fruits
    Fruit.deleteMany({}, (err, data) => {
 
        //we put create inside delete function because we want delete to finish before going to create function(this functions are running asynchronous)
 
        //Create new fruits once old fruits are deleted
        Fruit.create(startingFruits, (err, data) => {
            console.log(data)
 
        })
    })


})
