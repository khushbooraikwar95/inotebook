const express  = require('express')
const User =  require('../models/User');
const router  = express.Router();
const { body, validationResult } = require('express-validator');

//Create a user  using : POST "/api/auth/createuser". No Login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res)=>{
// if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check  weather the user with this  email exits already 
    try {
      
     
    let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry a user  with this  email already exists "})
    }
     user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      
     // .then(user => res.json(user)).catch(err=> {console.log(err) 
     //   res.json({error: 'Please enter a unique for email '})});
     res.json(user); 
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occured!")
    }

})

module.exports = router;
