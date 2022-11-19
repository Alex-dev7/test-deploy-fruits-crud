require('dotenv').config()// load env variables
const express = require('express')
const morgan = require('morgan')// - morgan => logs details about requests to our server, mainly to help us debug
const methodOverride = require('method-override')
const mongoose = require('mongoose')// gives us that db connection and cool methods for crud to the database

const PORT = process.env.PORT

const app = express()




//////////////////////////
//// . Database Connections
////////////////////////

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


//Establish our connection 
mongoose.connect(DATABASE_URL, CONFIG)


// Log connections events from mongoose
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))



//////////////////////////
//// Fruits Model
////////////////////////


const {Schema, model} = mongoose // pull schema and model from mongoose, destructuring

// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})


// make fruit model
const Fruit = model('Fruit', fruitsSchema)



//////////////////////////
//// Middlewares
////////////////////////

app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically



//////////////////////////
//// Routes
////////////////////////

app.get('/', (req, res) => {
     res.send('server id doing what it should be doing')
})


app.get('/fruits/seed', (req, res) => {

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
        Fruit.create(startingFruits, (err, createFruits) => {
            res.json(createFruits)

        })
    })
})

app.get('/fruits', (req, res) => {

    // Get all fruits from mango and send them back
    //The .then Method
    Fruit.find({})
    .then((fruits) => {
        res.json(fruits)
    })
    .catch(err => console.log(err))
})

//Setting Up Our Views





app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



// Home, Seed, then INDUCES