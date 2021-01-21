import express from 'express';
const app = express();
const port = 8900;
import database from './database';

app.get('/getData',(req,res) => {
    let output = database.getData('users')
    res.send(output)
})

app.post('/addData',(req,res) => {
    var mydata ={"name":"Aakash"}
    let output = database.postData('users',mydata);
    res.send(output)
})

app.listen(port,(err) => {
    console.log(`Server is ruuning on port ${port}`)
})