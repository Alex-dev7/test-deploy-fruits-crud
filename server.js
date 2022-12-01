require('dotenv').config()// load env variables
const express = require('express')
const morgan = require('morgan')// - morgan => logs details about requests to our server, mainly to help us debug
const methodOverride = require('method-override')
const mongoose = require('mongoose')// gives us that db connection and cool methods for crud to the database
const Fruit = require('./models/fruit')
const FruitRouter = require('./controllers/fruit')
const UserRouter = require("./controllers/user")
const session = require('express-session')
const MongoStore = require('connect-mongo')



const PORT = process.env.PORT

const app = express()



//////////////////////////
//// Middlewares
////////////////////////
app.use(morgan("dev")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
  }))
app.use('/fruits', FruitRouter)
app.use("/user", UserRouter)



//hoem route redirects to login/signup page
app.get("/", (req, res) => {
  Fruit.find({username: req.session.username}, (err, fruits) => {
    res.render("index.ejs", { fruits });
  })
  })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



// Home, Seed, then INDUCES