const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    database:'test_database',
    user:'root',
    password:'Pass@123'
});

module.exports = connection;