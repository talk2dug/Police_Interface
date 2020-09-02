var exec = require('child_process').exec;
var fs = require('fs');
var tripA = [];
var tripB = [];
var distanceTripA = 0;
var distanceTripB = 0;
var GPSarray = {};
var logSensors = {}
var gpsLogs = [];
var prevLAT;
var prevLAT;
var headingDir
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
//Add socket client here.
var mainServer = require('socket.io-client')('http://192.168.196.163:3000');
var dreamHost = require('socket.io-client')('http://192.168.196.123:3000');
mainServer.on('connect', function(){
console.log("CONNECTED");


});
mainServer.on('event', function(data){});
mainServer.on('disconnect', function(){});

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





function parseGPS(data) {
    var lat = data.state.lat;
    var lon = data.state.lon;
    //console.log(lat)
    if (lat != null) {
        tripA.push({latitude: lat,longitude: lon});
        tripB.push({latitude: lat,longitude: lon})
    }
    if (tripA.length === 4) {
        var distance = geolib.getPathLength(tripA, [10, 5]);
        distance = geolib.convertUnit('mi', distance, 4)
        distanceTripA = distanceTripA + distance;
        io.emit('distanceA', distanceTripA);
        tripA.length = 0;
    }
    if (tripB.length === 4) {
        var distance = geolib.getPathLength(tripB, [10, 5]);
        distance = geolib.convertUnit('mi', distance, 4)
        distanceTripB = distanceTripB + distance;
        io.emit('distanceB', distanceTripB);
        tripB.length = 0;
    }
}
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', function(data) {
    gps.update(data);
    parseGPS(gps);
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
    var headingDir = calculateHeading(data.lon, data.lat)
    GPSarray['lon'] = data.lon
    GPSarray['lat'] = data.lat
    GPSarray['heading'] = headingDir
    if (gps.state.speed != null) {GPSarray['speed'] = gps.state.speed.toFixed(2)}
    if (gps.state.speed == null) {GPSarray['speed'] = 0}
		GPSarray['time'] = data.time
		if (data.lon === null) {
		var pos = {'lon': '-76.558225','lat': '38.06033333333333'}
    } else {
        var pos = {'lon': data.lon,'lat': data.lat}
    }

    //mainServer.emit('gps', GPSarray)
    dreamHost.emit('gpsData', GPSarray)
    io.emit('state', GPSarray);
});
var os = require('os');
var ifaces = os.networkInterfaces();
var stopType = ''
io.on('connection', function(socket) {
Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function(iface) {
        console.log(ifname)
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }
        if (alias >= 1) {} else {
            ip = iface.address
        }
        ++alias;
    });
});

var startloggingCall


socket.on("buttonClicked", function(data){
    switch (data) {
        case 'shotsFired':
            mainServer.emit('action', 'shotsFired')
            mainServer.emit('action', 'startCall')
            break;
        case 'trafficStop':
            //mainServer.emit('action', 'trafficStop')
            mainServer.emit('action', 'startCall')
            break;
        case 'radioCall':
            //mainServer.emit('action', 'radioCall')
            mainServer.emit('action', 'startCall')
            break;
        case 'endCall':
            mainServer.emit('action', 'endCall')
            mainServer.emit('action', 'download')
            break;
        case 'DWI':
        //mainServer.emit('action', 'DWI')
        mainServer.emit('action', 'startCall')
            break;
        case 'someThing':
            mainServer.emit('action', 'someThing')
            break;
        case 'genericFlag':
            mainServer.emit('action', 'genericFlag')
            mainServer.emit('action', 'startCall')
            break;
        case 'signIn':
            mainServer.emit('settings', 'signIn')
            break;
        case 'startShift':
            mainServer.emit('settings', 'startShift')
            break;
        case 'endShift':
            mainServer.emit('settings', 'endShift')
            break;
        case 'logOut':
            mainServer.emit('settings', 'logOut')
            break;
        case 'ejectDisk':
            mainServer.emit('settings', 'ejectDisk')
            break;
        case 'settings':
            mainServer.emit('settings', 'settings')
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

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function calculateHeading(lon, lat) {
    var Heading = 0;
    var angles = require('angles');
    Heading = GPS.Heading(prevLAT, prevLAT, lat, lon);
    Heading = Heading.toFixed(0)
    prevLAT = lat;
    prevLON = lon;
    return Heading;
}
    var startMoving = null;

    function sendGPS() {
        io.emit('state', GPSarray);
        io.emit('heading', headingDir);
    }


    io.on('disconnect', function(socket) {})
    io.emit('ip', ip)



});
module.exports = {
    app: app,
    server: server
};
