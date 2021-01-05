var express = require('express');
var cityRouter = express.Router();

var location = [
    {
        "_id": 1,
        "city_name": "Delhi",
        "city": 1,
        "country_name": "India"
      },
      {
        "_id": 3,
        "city_name": "Pune",
        "city": 3,
        "country_name": "India"
      },
      {
        "_id": 2,
        "city_name": "Mumbai",
        "city": 2,
        "country_name": "India"
      },
      {
        "_id": 4,
        "city_name": "Chandigarh",
        "city": 4,
        "country_name": "India"
      },
      {
        "_id": 5,
        "city_name": "Goa",
        "city": 5,
        "country_name": "India"
      },
      {
        "_id": 6,
        "city_name": "Manali",
        "city": 6,
        "country_name": "India"
      }
]


function router(menu){
    cityRouter.route('/')
        .get(function(req,res){
            //res.send(location)
            res.render('City',{title:'City Page',menu:menu})
    });

    cityRouter.route('/details')
        .get(function(req,res){
            res.send('City Details')
    });

    return cityRouter;
}

module.exports = router;