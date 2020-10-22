var RallyComputer = io('//192.168.196.74:3000');
var mainServer = io('//192.168.196.163:3000');

function refreshEventListeners(){     
    $(".btn").on('click', function(e){
        var buttonID = $(e.target).attr('id')
        var innerText = e.target.innerHTML
        RallyComputer.emit('buttonClicked',buttonID )
        $('.stauts').text(innerText)
        
        console.log(officerInfo)
        
        switch(buttonID){
            
            case 'shotsFired':
                now = moment()
                officerInfo.date = now,
                officerInfo.action = "shotsFired"
                mainServer.emit('action', 'startcall' )
                mainServer.emit('officerStatus',officerInfo )

                break;
            case 'something':
                now = moment()
                officerInfo.date = now,
                officerInfo.action = "something"
                mainServer.emit('action', 'startcall' )
                mainServer.emit('officerStatus',officerInfo )

                break;
            case 'genericFlag':
                now = moment()
                officerInfo.date = now,
                officerInfo.action = "genericFlag"
                mainServer.emit('action', 'startcall' )
                mainServer.emit('officerStatus',officerInfo )

                break;
            case 'trafficStop': 
            now = moment()
                officerInfo.date = now,
                officerInfo.action = "trafficStop"
                mainServer.emit('action', 'startcall' )
                mainServer.emit('officerStatus',officerInfo )

                break;
            case 'DWI': 
            now = moment()
                officerInfo.date = now,
                officerInfo.action = "DWI"
                mainServer.emit('action', 'startcall' )
                mainServer.emit('officerStatus',officerInfo )

                break;
            case 'radioCall':
                now = moment()
                officerInfo.date = now,
                officerInfo.action = "radioCall"
                mainServer.emit('action', 'startcall' )
                mainServer.emit('officerStatus',officerInfo )

                break;

            case 'startShift':
                   
                $('#serverTypesULLeft').html(landingLeft2)
                $('#serverTypesULRight').html(landingRight)
                $('#headerTitle').text("Officer "+badgeNumber + " On Duty")
                
                $('#exampleModal2').modal('hide');
                officerInfo.shiftStatus = "Started"
                mainServer.emit('officerStatus',officerInfo )
                console.log(officerInfo)
                refreshEventListeners()
            break;
            case 'logOut':
                $('#headerTitle').text("SPD Video System")
                
                $('#exampleModal2').modal('hide');
                officerInfo.loggedOn = 0;
                officerInfo.action = 'logOut';
                mainServer.emit('officerStatus',officerInfo )
                console.log(officerInfo)
            break;
            case 'endCall':
                officerInfo.action = "endCall"
                $('.stauts').text('On Patrol')
                mainServer.emit('action','endcall' )
                console.log(officerInfo)
                
                mainServer.emit('officerStatus',officerInfo )
                break;
            case 'startCall':
                $('.stauts').text('At Call')
                RallyComputer.emit('action', 'startcall' )
                console.log(officerInfo)
                
                break;
            case 'signIn':
                $('.stauts').text('SIGNING IN')
                $('#exampleModal2').modal('hide');
                $('#exampleModal').modal('show');
                mainServer.emit('officerStatus',officerInfo )
                console.log(officerInfo)
               
                //RallyComputer.emit('action', 'signin')
                break;
            case 'endShift':
                if(officerInfo.shiftStatus !='Started'){
                    $('#exampleModal2').modal('hide');
                    $('.stauts').text('Shift Not Started')
                    
                    
                }
                else{
                    $('#serverTypesULLeft').html(landingLeft)
                $('#serverTypesULRight').html('')
                $('.stauts').text('Shift Ended')
                officerInfo.action = "endShift"
                officerInfo.shiftStatus = "ended"
                $('#headerTitle').text("Officer "+officerInfo.badgeNumber + " Off Duty")
                $('#exampleModal2').modal('hide');
                refreshEventListeners()
                mainServer.emit('officerStatus',officerInfo )
                mainServer.emit('action','download' )
                console.log(officerInfo)
            }   
                break;
                case 'settings':
                    $('#exampleModal2').modal('show');
                    
                    //$('.stauts').text('BACKING UP DATA')
                    //RallyComputer.emit('action', 'endShift')
                    break;
                
        }


    })
}


Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}

var badgeNumber = "";
var now = moment();
var officerInfo = {
    "badgeNumber": null,
    "loggedOn": 0,
    "shiftStatus":null,
    "date":now,
    "action":null

}
function sendTime(){
	var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');


    var stillUtc = moment.utc(date).toDate();
    var local = moment(stillUtc).local().format('HH:mm:ss');

	$('.currentTime').text(local);

}

$(function() {
    
    mainServer.on('connect', function(){
        
        $('#SystemStatus').text("\u2714 System Online")
        $('#SystemStatus').css( "color", "green" )
        mainServer.on('disconnect', function(){
            $('#SystemStatus').text("\u274C System Offline")
            $('#SystemStatus').css( "color", "red" )
           
            });
        });
        
    $('#mainDIV').html(maindivHomeHTML);
    refreshEventListeners()
    
    $('#SystemStatus').text("\u274C System Offline").css( "color", "red" )

    
   RallyComputer.on('state', function(state) {
        console.log(state.time)
        
        var utcDate = new Date(state.time);
        var localDate = new Date(utcDate);
        var datestring = state.time
        $('.currentTime').text(moment(localDate).format('HH:mm:ss'));
        console.log(moment(localDate).format('HH:mm:ss'))
        if(state.quality==='fix'){
            
        $('#GPSStatus').text("\u2714 GPS Connected");
        $('#GPSStatus').css( "color", "green" )
        }
        if(state.quality!='fix'){
            $('#GPSStatus').text("\u2716 GPS LOST");
            $('#GPSStatus').css( "color", "red" )
            }
        })

        
    
    $(".numberpad").on("click", function(){
        if($(this).text() ==='CLOSE'){

            $('#exampleModal').modal('hide');

        }
        else if($(this).text() ==='CLEAR'){
            badgeTyped = ""
            $('#badgeNumber').val(badgeTyped)

        }
        else if($(this).text() ==='DELETE'){
            var badgeTyped = $('#badgeNumber').val()
        badgeTyped = badgeTyped.substring(0, badgeTyped.length - 1);
        $('#badgeNumber').val(badgeTyped)

        }
        else if($(this).text() ==='ENTER'){
            badgeNumber = $('#badgeNumber').val()
            officerInfo.badgeNumber = badgeNumber
            mainServer.emit('badgeNumber',badgeNumber )
            $('#headerTitle').text("Officer "+badgeNumber + " Logged On")
        $('#badgeNumber').val('')
        officerInfo.loggedOn = 1;
        
        $('#exampleModal').modal('hide');
        console.log(officerInfo)

        }
       else{
        var badgeTyped = $('#badgeNumber').val()
        badgeTyped = badgeTyped + $(this).text()
        $('#badgeNumber').val(badgeTyped)
        
        console.log($(this).text());
    }
      });
      $('#status').text("....Please Log On....")
      RallyComputer.on('recordingStatus', function(state) {
        console.log("recording: " + state)
        
        $('#camStat').text(state);
        //$('#camStat').css( "color", "red" )
       
    })
});



