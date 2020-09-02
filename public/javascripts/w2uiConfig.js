var currentLocation = {};
var RallyComputer = io('//192.168.86.100:3000');
RallyComputer.on('position', function(pos) {
    var lat = parseFloat(pos.lat)
    var lon = parseFloat(pos.lon)
    currentLocation.lat = lat,
    currentLocation.lon = lon
})
var selectedRally = {};
var selectedItemID = ""
var done = 0;
var config = {
    tabs: {
        name: 'tabs',
        active: 'Landing',
        tabs: [
        	{id: 'Landing',}, 

        ],
        onClick: function(event) {
            var heading;
            $('#tab-example .tab').hide();
            $('#tab-example #' + event.target).show();
            switch (event.target) {
                case "Landing":
                    break;
                default:
            }
        }
    },
    landingLayout: {
        name: 'landingLayout',
        panels: [
        	{type: 'top',style: pstyle,resizable: false,size: 55,content: '',},
			{type: 'main',style: pstyle,resizable: false,size: '90%',content: ''}, 
			{type: 'left',style: pstyle,resizable: false,size: '25%',content: ''},
			{type: 'right',style: pstyle,size: '25%',resizable: false,content: landingRight}, 
         ]
    },
    settingsPage: {
        name: 'layoutSettings',
        panels: [
        	{type: 'top',size: 50,resizable: false,style: pstyle,content: "<div class='rallyTitle'>Setting</div>"},
            {type: 'left',size: 250,resizable: false,style: pstyle,content: ''},
            {type: 'main',size: '35%',style: pstyle,content: ""},
            {type: 'right',size: 250,resizable: false,style: pstyle,content: ''},
            {type: 'bottom',size: 75,resizable: false,style: pstyle,content: ''},
        ]
    },

}
