const express = require('express');
const app = express();
const port = 6700;
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var Pool = require('pg').Pool;
var pool = new Pool({
    hostname:'',
    username:'',
    port:'',
    database:'',
    password:'',
})

app.get('/user',(req,res) => {
    pool.query('SELECT * from emp',(err,data) => {
        if(err) throw err;
        res.status(200).send(data.rows)
    })
})

app.post('/user',(req,res) => {
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    pool.query('INSERT INTO "emp" (firstname,lastname) VALUES ($1,$2)',[firstname,lastname],(err,result)=>{
        if(err) throw err;
        res.status(200).send('Data Added')
    })
})


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})