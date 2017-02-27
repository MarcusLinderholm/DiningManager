/*

    Container implementing Persistence API using the connection.
    No OOP here just JSON data

*/
'use strict'

var db = require('../db/userdb.js');

function UserList(db) {
    this.db = db;
}

UserList.prototype = (function() {
    return {
        getUsers: function(callback) {
            //console.log("Get persons db is " + db);
            var sql = 'select * from members;';
            db.execute(sql, callback);
        },
        getById: function(id, callback) {
            var sql = 'select * from members where id=' + id + ";";
            db.execute(sql, callback);
        },
        add: function(name, email, password, callback) {
            // Uhhuu ugly string!!!
            var sql = "insert into members (name)" +
            "values('" + name + "', '" + email + "', '" + password + "');"
            db.execvoid(sql);
        },
        delete: function(id, callback) {
            var sql = "delete from members where id=" + id + ";";
            db.execvoid(sql);
        }
    }
})();

module.exports = new UserList(db);
