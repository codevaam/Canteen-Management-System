var express = require('express');
var router = express.Router();
var con = require('../db');
var server = require('http').Server(router);
var io = require('socket.io')(server);
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
require('dotenv').config();

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

router.post('/addStudent',async function (req, res) {
  const name = req.body.name;
  const regno = req.body.regno;
  const messname = req.session.messname;
  var addQuery = `INSERT INTO students(name, regno, messname) values('${name}', '${regno}', '${messname}')`;
  con.query(addQuery, function (error, result, fields) {
    if (error) {
      console.log(error);
    }
    if (result) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'devamtrivedi71@gmail.com',
          pass: process.env.PASSWD
        }
      });

      var mailOptions = {
        from: 'devamtrivedi71@gmail.com',
        to: 'devamtrivedi@ymail.com',
        subject: 'Set your password',
        html: `<h2>Welcome to ${messname}</h2><p>Set your password</p><a href="http://localhost:3000/auth/set_password/${regno}">here</a>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({
        message: "success"
      });
    }
  })
})

router.get('/orders', function (req, res) {
  const messname = req.session.messname;
  con.query('SELECT orders.id, menu.itemname, served.served, orders.quantity, served.timeOfOrder FROM orders JOIN served ON served.timeOfOrder = orders.timeOfOrder JOIN menu on orders.food_id = menu.id', function (error, result, fields) {
    console.log(result);
    res.json(result);
  })
})

router.post('/serve', function (req, res) {
  let time = req.body.time;
  const query = `UPDATE served SET served='true' WHERE timeOfOrder='${time}'`;

  con.query(query, function (error, result, field) {
    if(error){
      console.log(error);
    }
    else if(result) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'devamtrivedi71@gmail.com',
          pass: process.env.PASSWD
        }
      });

      var mailOptions = {
        from: 'devamtrivedi71@gmail.com',
        to: 'devamtrivedi@ymail.com',
        subject: 'Food ready',
        html: `<h2>Your delicious food is ready</h2><p>Come within 15 mins else...</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json(result);
    }
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