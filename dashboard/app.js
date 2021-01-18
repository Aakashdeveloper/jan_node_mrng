const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = `mongodb://localhost:27017`;
let db;
let col_name="userdata";

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//health
app.get('/',(req,res) => {
    res.status(200).send('Health Ok')
})

//postUser
app.post('/addUser',(req,res) => {
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send("Data Added")
    })
});

//get user
app.get('/users',(req,res) => {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//updateUser
app.put('/updateUser',(req,res) => {
    var id = mongo.ObjectID(req.body._id)
    db.collection(col_name).update(
        {_id:id},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})

//remove
app.delete('/deleteUser',(req,res) => {
    var id = mongo.ObjectID(req.body._id)
    db.collection(col_name).remove({_id:id},(err,result) => {
        if(err) throw err;
        res.send('Data Deleted')
    })
})



MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('jannode');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})