////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express") // bring express so we can make our router
const Fruit = require("../models/fruit")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()  // this router will have all routes attached to it



////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
   if (req.session.loggedIn) {
     next();
   } else {
     res.redirect("/user/login");
   }
 });


/////////////////////////////////////////
// Actual Routes here
/////////////////////////////////////////

router.get('/seed', (req, res) => {

   //define data we want to put in the database
   
})

router.get('/', (req, res) => {

   // Get all fruits from mango and send them back
   //The .then Method
   Fruit.find({})
   .then((fruits) => {
       res.render('fruits/index.ejs', { fruits })
   })
   .catch(err => console.log(err))
})

// ------------new rote ---------
router.get('/new', (req, res) => {
   res.render('fruits/new.ejs')
})


//-------------- POST -------------
router.post('/', (req, res) => {
   
   req.body.readyToEat = req.body.readyToEat === "on" ? true : false

   // add username to req.body to track related user
  req.body.username = req.session.username
  
   Fruit.create(req.body, (err, createdFruit) => {
       console.log(createdFruit, err)

       // redirect the user back to the main fruits page after fruit created
       res.redirect('/fruits')
   })
})

// ------------ EDIT --------------
router.get('/:id/edit', (req, res) => {
    // get the id from params
    const id = req.params.id
     // get the fruit from the database
   Fruit.findById(id, (err, foundFruit) => {
       // render template and send it fruit
     res.render('fruits/edit.ejs', {fruit: foundFruit})
   })

})
//put goes with edit
router.put('/:id', (req, res) => {

   req.body.readyToEat = req.body.readyToEat === "on" ? true : false

    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFruit) => {
       // console.log(updatedFruit, err);
         res.redirect(`/fruits/${req.params.id}`)
    }) 

})



// ---------- SHOW ROUTE ----------
router.get('/:id', (req, res) => {
   
   // go and get fruit from database
   Fruit.findById(req.params.id)
   .then((fruit) => {
       res.render('fruits/show.ejs', { fruit })
   })
})
  //----- DELETE --------
  router.delete('/:id', (req, res) => {
        Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
           // console.log(err, deletedFruit)
           res.redirect('/fruits')
        })
  })


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router