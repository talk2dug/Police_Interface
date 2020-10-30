var exec = require('child_process').exec;
var fs = require('fs');

var GPSarray = {};

var prevLAT;
var prevLAT;

var ip = "";
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var database = require('./routes/database');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sendGPS = 0;
//Add socket client here.
var mainServer = require('socket.io-client')('http://192.168.196.163:3000');

mainServer.on('connect', function(){
console.log("CONNECTED");


});
mainServer.on('event', function(data){});
mainServer.on('disconnect', function(){

mainServer.removeAllListeners();

});
var recordStat = 0
var geolib = require('geolib');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var $
var moment = require('moment')

require('events').EventEmitter.prototype._maxListeners = 100;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/database', database);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.use(function(req, res, next) {
    res.io = io;
    next();
});





var os = require('os');
var ifaces = os.networkInterfaces();
var stopType = ''
io.on('connection', function(socket) {

    socket.on("gpsData", function(data){
        console.log(data)


    })
    mainServer.on('recordingStatus', function(data){
        recordStat = data;
        //console.log("data")
        //console.log(data)
        

})


socket.on("buttonClicked", function(data){
    switch (data) {
        case 'shotsFired':
            sendGPS = 1;
            break;
        case 'trafficStop':
            sendGPS = 1;
            break;
        case 'radioCall':
            sendGPS = 1;
            break;
        case 'endCall':
            sendGPS = 0;
            break;
        case 'DWI':
        sendGPS = 1;
            break;
        case 'something':
            sendGPS = 1;
            break;
        case 'genericFlag':
            sendGPS = 1;
            break;

        default:
            break;
    }
})
function interval(func, wait, times) {
    var interv = function(w, t) {
        return function() {
            if (typeof t === "undefined" || t-- > 0) {
                setTimeout(interv, w);
                try {
                    func.call(null);
                } catch (e) {
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);
    setTimeout(interv, wait);
};


    var startMoving = null;
    
    io.on('disconnect', function(socket) {})
    io.emit('ip', ip)
});
module.exports = {
    app: app,
    server: server
};
