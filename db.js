var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'devam',
    password: 'hpx360pav',
    database: 'testdb'
  })
  
  con.connect(function(err){
    if(err) throw err;
    else{
      console.log("connected to the local database");
    }
  });

module.exports = con;