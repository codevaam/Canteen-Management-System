var express = require('express');
var router = express.Router();
var con = require('./db');
// var con = require('app').con;

var generate = function(){
    // var query = "create table admin (username varchar(20), password varchar(64))"
    // var query = "insert into admin values('admin','test');"
    var query = "update admin set mess='foodcy' where username='admin'"
    con.query(query);
}

module.exports = generate;