var express = require('express');
var router = express.Router();
var con = require('../db');

router.get('/', function(req, res){
    res.render('adminLogin');
})

router.post('/', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    con.query("SELECT * FROM admin where username = ?",[username], function(error, results, fields){
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
                res.render('dashboard', {data: data});
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

router.get('/students', function(req, res){
    con.query("SELECT * FROM students", function(error, results, fields){
        console.log(results);
        res.render('studentInfo', {data: results});
    });
})
module.exports = router;


// ORDERS ROUTE