const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('./userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//get All users
router.get('/users',(req,res) => {
    User.find({},(err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//Regsiter User
router.post('/register',(req,res) =>{
    var hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        password:hashpassword,
        email:req.body.email,
        role:req.body.role?req.body.role:'User'
    },(err,user) => {
        if(err) return res.status(500).send('Error')
        res.status(200).send('Register success')
    })
});

//login User
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send("Error while login")
        if(!user) return res.status(400).send("No User Found");
        else{
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passIsValid )return res.status(400).send("Invalid password")
            var token = jwt.sign({id:user._id},config.secert,{expiresIn:86400});
            res.send({auth:true,token:token})
        }
    })
});


//profile 
router.get('/userInfo',(req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'});
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send({auth:false,token:'Invalid Token'});
        User.findById(data.id,{password:0},(err,result) => {
            res.send(result)
        })
    })
})

module.exports = router;