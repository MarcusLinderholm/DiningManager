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

        userLookup: function(email, callback) {
            //var sql = 'select * from members;';
            var sql = "select password from members where email=" + email + ";";
            //var sql = 'select password from members where email=' + email + ";"
            db.execute(sql, callback);

        },


        addUser: function(email, password, map, callback) {


            var sql = "insert into members (email, password, map)" +

            "values('" + email + "', '" + password + "', '" + map + "');"

            //console.log(db.execute(sql, callback));

            db.execute(sql, callback);



            //(console.log("added user"));
        },
        deleteUser: function(id, callback) {
            var sql = "delete from members where id=" + id + ";";
            db.execvoid(sql);
        }
    }
})();

module.exports = new UserList(db);
