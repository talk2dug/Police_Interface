var exec = require('child_process').exec;
var fs = require('fs');

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
mainServer.on('connect', function(){
console.log("CONNECTED");


});
mainServer.on('event', function(data){});
mainServer.on('disconnect', function(){});

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
socket.on("badgeNumber", function(data){

        console.log(data)
        mainServer.emit('badgeNumber', data);

})

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
            //mainServer.emit('action', 'download')
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
            mainServer.emit('action', 'signIn')
            break;
        case 'startShift':
            mainServer.emit('action', 'startShift')
            break;
        case 'endShift':
            mainServer.emit('action', 'download')
            break;
        case 'logOut':
            mainServer.emit('action', 'logOut')
            break;
        case 'ejectDisk':
            mainServer.emit('action', 'ejectDisk')
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


    var startMoving = null;
    
    io.on('disconnect', function(socket) {})
    io.emit('ip', ip)
});
module.exports = {
    app: app,
    server: server
};
