Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}
function sendTime(){
	var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');


    var stillUtc = moment.utc(date).toDate();
    var local = moment(stillUtc).local().format('HH:mm:ss');

	$('.currentTime').text(local);

}
var RallyComputer = io('//192.168.196.74:3000');
$(function() {
    $('#mainDIV').html(maindivHomeHTML);


    var state = {}
    var latstart
    var lonstart

    RallyComputer.on('location', function(state) {
        state = state
        //console.log("STATE")
        //console.log(state)
        latstart = state.lat
        lonstart = state.lon
    })


    RallyComputer.on('ip', function(ip) {
        $('#ip').text(ip)
    })





   RallyComputer.on('state', function(state) {
        console.log(state.time)
        var utcDate = new Date(state.time);
        var localDate = new Date(utcDate);
        var datestring = state.time
        $('.currentTime').text(moment(localDate).format('HH:mm:ss'));
        console.log(moment(localDate).format('HH:mm:ss'))


        })





    RallyComputer.on('tabChange', function(msg) {
        switch (msg['current'].Type) {

            case "weather":
                break;
        }
    });

});




$(document).click(function(e) {
    if(e.target.localName == "button"){
        console.log("BUTTON")
        console.log(e)
        var buttonID = $(e.target).attr('id')
        var innerText = e.target.innerHTML
        RallyComputer.emit("buttonClicked", buttonID)
        switch(buttonID){
            case 'endCall':
                $('.status').text('On Patrol')
                RallyComputer.emit('actions','endcall' )
            case 'startCall':
                $('.status').text('At Call')
                RallyComputer.emit('actions', 'startcall' )
            case 'signIn':
                $('.status').text('SIGNING IN')
                RallyComputer.emit('actions', 'signin')
            case 'download':
                $('.status').text('BACKING UP DATA')
                RallyComputer.emit('actions', 'download')
        }
    }




})
