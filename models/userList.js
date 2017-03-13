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
            //var sql = "select password from members where email=" + email + ";";
            var sql = "select * from members where email='" + email + "';";
            db.execute(sql, callback);

        },


        addUser: function(email, password, map, callback) {


            var sql = "insert into members (email, password, map)" +

                "values('" + email + "', '" + password + "', '" + map + "');"

            //console.log(db.execute(sql, callback));

            db.execute(sql, callback);
        },

        addTable: function(email, tables, callback) {

            for (var i = 1; i < parseInt(tables) + 1; i++) {
                    var sql = "insert into tables (email, tableID)" +
                    "values('" + email + "', '" + i + "');"
                    db.execute(sql, callback);

            }
        },

        bookTable: function(email, table, time, callback){
            var sql = "insert into bookings (email, tableID, time)" +
            "values('" + email + "', '" + table + "', '" + time + "');"
            db.execute(sql, callback);
        },

        removeBooking: function(currEmail, currTime, callback) {
            var sql = "delete from bookings where email= '" + currEmail + "' and time<= '" + currTime + "';"
            db.execute(sql, callback);
            //delete from bookings where email=currEmail and time=currTime
        },

        getBookings: function(currEmail, callback) {
            var sql = "select * from bookings where email= '" + currEmail + "' ORDER BY time ASC";
            //console.log(sql);
            db.execute(sql, callback);
        },

        deleteBooking: function(currEmail, id, time, callback){
            var sql = "delete from bookings where email= '" + currEmail + "' and time== '" + currTime + "' and id== '" + id + "';"
            db.execute(sql, callback);

        }


    }
})();

module.exports = new UserList(db);
