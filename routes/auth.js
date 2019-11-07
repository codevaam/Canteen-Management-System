var express = require('express');
var router = express.Router();
var session = require('express-session');
var userHandlers = require('../controllers/resetpsw');
var con = require('../db');

router.get('/set_password/:reg', (req, res) => {
    var regno = req.params.reg
    req.session.regno = regno;
    console.log(req.session);
    res.render('setpsw');
})

router.post('/set_password/:reg', (req, res) => {
    console.log(req.body);
    var password = req.body.password;
    var regno = req.session.regno;
    console.log(regno);
    var query = `UPDATE students SET password='${password}' WHERE regno='${regno}'`;
    con.query(query, (error, results, fields) => {
        if(error) {
            console.log(error)
        }
        else if(results) {
            res.redirect('/')
        }
    })
})

module.exports = router;