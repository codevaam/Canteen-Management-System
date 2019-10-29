var express = require('express');
var router = express.Router();
var con = require('../db');
var server = require('http').Server(router);
var io = require('socket.io')(server);

server.listen(8080);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
})

router.get('/', function (req, res) {
  res.render('adminLogin');
})

router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  con.query("SELECT * FROM admin where username = ?", [username], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password == password) {
          var data = results;
          req.session.messname = data[0].mess;
          console.log(data);
          console.log(req.session);
          res.render('dashboard', { data: data });
        }
        else {
          res.send({
            "code": 204,
            "success": "username and password does not match"
          });
        }
      }
      else {
        res.send({
          "code": 204,
          "success": "username does not exits"
        });
      }
    }
  })
})

router.get('/students', function (req, res) {
  con.query("SELECT * FROM students", function (error, results, fields) {
    console.log(results);
    res.json(results);
  });
})
router.get('/delete', function (req, res) {
  const regno = req.query.regno;
  var deleteQuery = 'DELETE FROM students WHERE regno="' + regno + '"';
  con.query(deleteQuery, function (error, result, fields) {
    if (error) {
      res.send({
        message: "error in deleting",
      })
    }
    if (result) {
      console.log(result);
      res.send({
        message: "success",
      })
    }
  })
})

router.get('/deleteFood', function (req, res) {
  const food_id = req.query.food_id;
  var deleteQuery = `DELETE FROM menu WHERE id='${food_id}'`;
  console.log(deleteQuery);
  con.query(deleteQuery, function (error, result, fields) {
    if (error) {
      console.log(error);
      res.send({
        message: "error in deleting",
      })
    }
    if (result) {
      // console.log(result);
      res.send({
        message: "success",
      })
    }
  })
})



router.get('/menu', function (req, res) {
  console.log(req.session);
  const messName = req.session.messname;

  con.query("SELECT * FROM menu WHERE messname = ?", [messName], function (error, results, fields) {
    console.log(error);
    res.json(results);
  });
})

router.post('/addFood', function (req, res) {
  const itemName = req.body.itemName;
  const cost = req.body.cost;
  var addQuery = `INSERT INTO menu values(NULL, '${itemName}', ${cost}, '${req.session.messname}')`;
  con.query(addQuery, function (error, result, fields) {
    if (result) {
      res.send({
        message: "success",
      });
    }
  });
})

router.post('/addStudent', function (req, res) {
  const name = req.body.name;
  const regno = req.body.regno;
  const messname = req.session.messname;
  var addQuery = `INSERT INTO students(name, regno, messname) values('${name}', '${regno}', '${messname}')`;
  con.query(addQuery, function (error, result, fields) {
    if (error) {
      console.log(error);
    }
    if (result) {
      res.send({
        message: "success"
      });
    }
  })
})

router.get('/orders', function (req, res) {
  const messname = req.session.messname;
  con.query('SELECT * FROM served', function (error, result, fields) {
    console.log(result);
    res.json(result);
  })
})

router.post('/serve', function (req, res) {
  let time = req.body.time;
  const query = `UPDATE served SET served='true' WHERE timeOfOrder='${time}'`;
  con.query(query, function (error, result, field) {
    console.log(error);
    res.json(result);
  })
})

module.exports = router;



// ORDERS ROUTE

// function userCheck() {
//   if(req.sesion.name){
//     return true;
//   }
//   else{
//     return false;
//   }
// }