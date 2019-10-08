var express = require('express');
var router = express.Router();
var con = require('./db');
// var con = require('app').con;

var generate = function(){
    // var query = "create table admin (username varchar(20), password varchar(64))"
    // var query = "insert into admin values('admin','test');"
    // var query = "update admin set mess='foodcy' where username='admin'"
    // var query = "CREATE TABLE ORDER(order_id int, food varchar"
    // var query = "create table menu(food_id int, name varchar(20), cost int)"
    // var query = "insert into menu values(1, 'roti', 16, 'foodcy')"
    // con.query(query);
}

module.exports = generate;