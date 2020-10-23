'use strict';
 
var OBD = require('obd-parser');
 
var getConnector = require('obd-parser-serial-connection');
 
var connect = getConnector({
  serialPath: '/dev/ttyUSB0',
  serialOpts: {
    baudrate: 38400
  }
});
 
OBD.init(connect)
  .then(function () {
    var rpmPoller = new OBD.ECUPoller({
      pid: new OBD.PIDS.Rpm(),
      interval: 1500
    });
 
    rpmPoller.on('data', function (output) {
      console.log('==== Got RPM Output ====');
      console.log('time: ', output.ts);
      console.log('bytes: ', output.bytes);
      console.log('value: ', output.value);
      console.log('pretty: ', output.pretty);
    });
 
    rpmPoller.startPolling();
});