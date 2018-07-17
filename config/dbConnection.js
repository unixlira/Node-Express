var mysql = require('mysql');

var connMyQL =  function () {
    return  mysql.createConnection({
    host: 'localhost',
    user: 'unixlira',
    password: '#Fibra13',
    database: 'portal_noticias'
    });
}

module.exports = function(){
    return connMyQL;
}