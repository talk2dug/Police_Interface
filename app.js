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
var mainServer = require('socket.io-client')('http://10.10.10.3:3000');

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
var uri = 'mongodb://localhost:27017/policeCar';
var connection = mongoose.createConnection(uri);
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    $ = require("jquery")(window);
});
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

var GPS = require('./node_modules/gps/gps.js');
var gps = new GPS;
const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyS0', {
    baudRate: 9600
})
const Readline = require('@serialport/parser-readline')

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})





const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', function(data) {
    gps.update(data);
  
})
function calculateHeading(lon, lat) {
    var Heading = 0;
    var angles = require('angles');
    Heading = GPS.Heading(prevLAT, prevLAT, lat, lon);
    Heading = Heading.toFixed(0)
    prevLAT = lat;
    prevLON = lon;
    return Heading;
}
gps.on('GGA', function(data) {
    if (!data.time)
    return;
    var exec = require('child_process').exec;
  exec('date -s "' + data.time.toString() + '"', function(error, stdout, stderr) {
    if (error) throw error;
    // Clock should be set now, exit
    //console.log("Set time to " + data.time.toString());
    //process.exit();
  });
    var headingDir = calculateHeading(data.lon, data.lat)
    GPSarray['lon'] = data.lon
    GPSarray['lat'] = data.lat
    GPSarray['heading'] = headingDir
    GPSarray['satsActive'] = data.satelites
    GPSarray['alt'] = data.alt
    GPSarray['time'] = data.time
    GPSarray['quality'] = data.quality

    if (gps.state.speed != null) {GPSarray['speed'] = gps.state.speed.toFixed(2)}
    if (gps.state.speed == null) {GPSarray['speed'] = 0}
    //console.log(GPSarray)
    mainServer.emit('state',GPSarray)
    if(sendGPS===1){
        mainServer.emit('gpscarGPS', GPSarray)
    }
io.emit('state',GPSarray )
io.emit('recordingStatus',recordStat )
});



io.on('connection', function(socket) {


    mainServer.on('recordingStatus', function(data){
        recordStat = data;
        console.log("data")
        console.log(data)
        

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


    
    io.on('disconnect', function(socket) {})
    io.emit('ip', ip)
});
module.exports = {
    app: app,
    server: server
};
