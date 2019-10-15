var express = require('express');
var router = express.Router();
var con = require('../db');

router.get('/', function(req, res){
    res.render('studentLogin');
})

router.post('/', function (req, res) {
    var regno = req.body.regno;
    var password = req.body.password;
    con.query("SELECT * FROM students where regno = ?",[regno], function(error, results, fields){
        if (error) {
            // console.log("error ocurred",error);
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
          }else{
            // console.log('The solution is: ', results);
            if(results.length >0){
              if(results[0].password == password){
                var data = results;
                var hr = (new Date()).getHours();
                if(hr>5 && hr<=10){
                    req.session.meal = 'breakfast';
                }
                else if(hr>10 && hr<16){
                    req.session.meal = 'Lunch';
                }
                else if(hr>=16 && hr<=18){
                    req.session.meal = 'Snacks';
                }
                else if(hr>18 && hr<21) {
                    req.session.meal = 'Dinner';
                }
                else {
                    req.session.meal = 'Order Next Meal'
                }
                req.session.regno = data[0].regno;
                req.session.name = data[0].name;
                req.session.mess = data[0].messname;
                // console.log(data);
                // console.log(req.session);
                res.render('studentDashboard', {data: req.session});
              }
              else{
                res.send({
                  "code":204,
                  "success":"username and password does not match"
                    });
              }
            }
            else{
              res.send({
                "code":204,
                "success":"username does not exits"
                  });
            }
          }
    })
})

router.get('/menu', function(req, res){
  console.log(req.session);
  const messName = req.session.mess;
  
  con.query("SELECT * FROM menu WHERE messname = ?", [messName], function(error, results, fields){
    console.log(error);
    res.json(results);
  });
})

module.exports = router;