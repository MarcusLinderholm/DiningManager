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

});

module.exports = {
    // Will return result
    execute: function(sql, resultcallback) {

        pool.getConnection(function(err, con) {
            if (err) {
                console.log("Query failed: " + sql + err)
            } else {
                con.query(sql, resultcallback);
            }
            con.release();
        });

    },
    // No result
    execvoid: function(sql) {
        this.execute(sql, function(err, con) {});
    }
}
