const router =express.Router()
const express=require('express')
const User=require('../models/User')
router.post('/',[
   body('name').isLength({min:3}),
   body('email').isEmail(),
   body('password').isLength({min:5}),


],(req,res)=>{
const errors=validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()})
    } else {
        const hashedPassword=req.body.password
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        newUser.save().then(user=>res.json(user))
        }
        
 res.send(req.body)
})
module.exports=router