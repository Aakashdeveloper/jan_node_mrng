var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 9800;



//staticfile
app.use(express.static(__dirname+'/public'));
//html
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.get('/weather',(req,res) => {
    let city = req.query.city;
    apiurl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    request(apiurl,(err,response) => {
        if(err) throw err;
        let output = JSON.parse(response.body);
        res.render('index',{title:'Weather App',result:output})
    })
});

app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})