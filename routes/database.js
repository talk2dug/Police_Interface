var express = require('express');
var router = express.Router();
var http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var $
var moment = require('moment');


var GPS_LogsSchema = new Schema({
    'event': String,
    'dateTime': Date,
    'logs':[{
        lat: Number,
        lon: Number,
        heading:Number,
        speed:Number,
        time:Date,
        }],


})
GPS_LogsSchema.set('toJSON', {
    virtuals: true
});
var GPS_Logs = mongoose.model('GPS_Logs', GPS_LogsSchema, 'gps_logs');




router.get('/getlogs', function(req, res) {
    GPS_Logs.find({}, function(err, results) {
        
        
        //invoke callback with your mongoose returned result
        res.send(results);
      });
});

module.exports = router;