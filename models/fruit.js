//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection") // this mongoose alreade has the data base set up, so we just use it here

//////////////////////////
//// Fruits Model
////////////////////////


const {Schema, model} = mongoose // pull schema and model from mongoose, destructuring

// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String
})


// make fruit model
const Fruit = model('Fruit', fruitsSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Fruit