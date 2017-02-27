/*

    Basic database connection used by models
    Need module mysql
*/

var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'sebastian',
    password: 'hejsan',
    database: 'diningmanager',
    //debug: true // This is GOOD !!!
});

module.exports = {
    // Will return result
    execute: function(sql, resultcallback) {
        console.log("hej");
        pool.getConnection(function(err, con) {
            if (err) {
                console.log("Query failed: " + sql + err)
            } else {
                con.query(sql, resultcallback);
                console.log("connection established");
            }
            con.release();
        });

    },
    // No result
    execvoid: function(sql) {
        this.execute(sql, function(err, con) {});
    }
}
