/*

    Container implementing Persistence API using the connection.
    No OOP here just JSON data

*/
'use strict'

var db = require('../db/userdb.js');

function dbFunc(db) {
    this.db = db;
}

dbFunc.prototype = (function() {
    return {
        userLookup: function(email, callback) {
            //var sql = 'select * from members;';
            //var sql = "select password from members where email=" + email + ";";
            var sql = "select * from members where email='" + email + "';";
            db.execute(sql, callback);

        },


        addUser: function(email, password, map, callback) {
            var sql = "insert into members (email, password, map)" +
                      "values('" + email + "', '" + password + "', '" + map + "');"
            db.execute(sql, callback);
        },

        addTable: function(email, tables, callback) {
            for (var i = 1; i < parseInt(tables) + 1; i++) {
                var sql = "insert into tables (email, tableID)" +
                    "values('" + email + "', '" + i + "');"
                db.execute(sql, callback);

            }
        },

        bookTable: function(email, table, time, name, callback) {
            var sql = "insert into bookings (email, name, tableID, time)" +
                "values('" + email + "', '" + name + "', '" + table + "', '" + time + ":00" + "');"
            db.execute(sql, callback);
        },

        deleteBookingsByTime: function(email, currTime, callback) {
            var sql = "delete from bookings where email= '" + email + "' and time<= '" + currTime + "';"
            db.execute(sql, callback);
            //delete from bookings where email=currEmail and time=currTime
        },

        getBookings: function(email, callback) {
            var sql = "select * from bookings where email= '" + email + "' ORDER BY time ASC";
            //console.log(sql);
            db.execute(sql, callback);
        },

        getTableBookings: function(email, table, callback) {
            var sql = "select * from bookings where email= '" + email + "' and tableID= '" + table + "';"
            db.execute(sql, callback);
        },

        deleteBooking: function(email, id, time, callback) {
            var sql = "delete from bookings where email= '" + email + "' and time= '" + time + ":00" + "' and tableID= '" + id + "';"
            db.execute(sql, callback);

        }


    }
})();

module.exports = new dbFunc(db);
