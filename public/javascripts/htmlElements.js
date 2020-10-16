var div1 = "<div id='speed' class='lcdsmall'></div>"
var map = "<div id='timeout'></div><div id='map'></div>"
var pstyle = 'background: url("/images/metal-textures-2.jpg")';
var tabs = "<div id='tab-example'>" +
    			"<div id='tabs' style='width: 100%; height: 0px;'></div>" +
				"<div id='Landing' class='tab'>" +
					"<div id='landingPage'></div>" +
				"</div>" +
			"</div>"
var landingLeft = "<button type='button' class='btn-secondary btn btn-block' id='signIn'>Sign In</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='startShift'>Start Shift</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='endShift'>End Shift</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='logOut'>Log Out</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='ejectDisk'>Eject Disk</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='Settings'>Settings</button>"
var landingRight = "<button type='button' class='btn-secondary btn btn-block' id='trafficStop'>Traffic Stop</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='DWI'>DWI</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='radioCall'>Radio Call</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='something'>Something</button>"+
"<button type='button' class='btn-secondary btn btn-block'' id='shotsFired'>Shots Fired</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='genericFlag'>Generic Flag</button>"+
"<button type='button' class='btn-secondary btn btn-block' id='endCall'>End Call</button>"

var bootstrapHTML = "<div class='container'>"+
"<div class='row'>"+
  "<div class='col-sm'>"+
	"One of three columns"+
  "</div>"+
  "<div class='col-sm'><div class='container'>"+
"<div class='row'>"+
  "<div class='col-sm'>"+
	"One of three columns"+
  "</div>"+
  "<div class='col-sm'>"+
	"One of three columns"+
  "</div>"+
  "<div class='col-sm'>"+
	"One of three columns"+
  "</div>"+
"</div>"+
"</div>"+
	"One of three columns"+
  "</div>"+
  "<div class='col-sm'>"+
	"One of three columns"+
  "</div>"+
"</div>"+
"</div>"

var maindivHomeHTML = "<div class='card text-center'>"+
						"<div class='card-header'>"+
							"<h3>SPD In-Car System</h3>"+
						"</div>"+
						"<div class='row'>"+
							"<div class='col'>"+
								"<div class='sidebar-sticky pt-3'>"+
									"<ul class='list-group flex-column' id='serverTypesUL'>"+
									landingLeft +
									"</ul>"+
								"</div>"+
							"</div>"+
							"<div class='col-6'>"+
								
									"<div class='card card-inner'>"+
										"<img src='/images/SPD.png' class='card-img-top' alt='...'>"+
										"<div class='card-body card-body-inner'>"+
										
										"</br>"+
										"<h4 class='stauts'>DUI STOP</h4>"+
										
										"</br>"+
										
											"<h3 class='currentTime'></h3>"+
										"</div>"+
							  		"</div>"+
								
							"</div>"+
							"<div class='col'>"+
								"<div class='sidebar-sticky pt-3'>"+
									"<ul class='list-group flex-column' id='serverTypesUL'>"+
										landingRight +
									"</ul>"+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div class='card-footer text-muted'>"+
							"All 7 cameras online"+
						"</div>"+
					"</div>"+
					"<div class='modal fade' id='exampleModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>"+
				   "<div class='modal-dialog modal-lg'>"+
					 "<div class='modal-content modalWidth'>"+
					 "<div class='modal-header'>"+
					 "<h5>Badge</h5>"+
					 "<input id='badgeNumber' class='form-control form-control-md' type='text' placeholder='Type Badge Number'></input>"+
					 "</div>"+
					   "<div class='modal-body'>"+
					   "<div class='container containerNumberPad'>"+
					   "<div class='row'>"+
						 "<div class='col-sm numberpad' data='7'>"+
						   "7"+
						"</div>"+
						 "<div class='col-sm numberpad' data='8'>"+
						   "8"+
						 "</div>"+
						 "<div class='col-sm numberpad' data='9'>"+
						   "9"+
						 "</div>"+
						 "<div class='col-sm numberpad keyaction' data='CLOSE'>"+
						   "CLOSE"+
						 "</div>"+
					   "</div>"+
					   "<div class='row'>"+
						 "<div class='col-sm numberpad' data='4'>"+
						   "4"+
						"</div>"+
						 "<div class='col-sm numberpad' data='5'>"+
						   "5"+
						 "</div>"+
						 "<div class='col-sm numberpad' data='6'>"+
						   "6"+
						 "</div>"+
						 "<div class='col-sm numberpad keyaction' data='CLR'>"+
						   "CLEAR"+
						 "</div>"+
					   "</div>"+
					   "<div class='row'>"+
						 "<div class='col-sm numberpad' data='1'>"+
						   "1"+
						"</div>"+
						 "<div class='col-sm numberpad' data='2'>"+
						   "2"+
						 "</div>"+
						 "<div class='col-sm numberpad' data='3'>"+
						   "3"+
						 "</div>"+
						 "<div class='col-sm numberpad keyaction' data='DEL'>"+
						   "DELETE"+
						 "</div>"+
					   "</div>"+
					   "<div class='row'>"+
						 
						 "<div class='col-sm numberpad' data='*'>"+
						   "*"+
						 "</div>"+
						  
						 "<div class='col-sm numberpad' data='0'>"+
						   "0"+
						 "</div>"+
						 "<div class='col-md numberpad' data='#'>"+
						   "#"+
						 "</div>"+
						 "<div class='col-sm numberpad keyaction' data='ENTER'>"+
						   "ENTER"+
						 "</div>"+
					   "</div>"+
					 "</div>"+
					   







					   "</div>"+
					 
					 "</div>"+
				   "</div>"+
				   "</div>"	




var maincontainer = "<div class='container'>" +
   
    	"<div class='card  shadow-sm'>" +
    		"<div class='card-header'>" +
    			"<h4 class='my-0 font-weight-normal'>Switch Stacks</h4>" +
    		"</div>" +
			"<div class='card-body'>" +
				"<nav id='sidebarMenu' class='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>"+
					"<div class='sidebar-sticky pt-3'>"+
						"<ul class='list-group flex-column' id='serverTypesUL'>"+
							"<button type='button' class='btn-secondary btn btn-block'>Large button</button>"+
							"<button type='button' class='btn-secondary btn btn-block'>Sign In</button>"+
							"<button type='button' class='btn-secondary btn btn-block'>Start Shift</button>"+
							"<button type='button' class='btn-secondary btn btn-block'>End Shift</button>"+
							"<button type='button' class='btn-secondary btn btn-block'>Log Out</button>"+
							"<button type='button' class='btn-secondary btn btn-block'>Eject Disk</button>"+
							"<button type='button' class='btn-secondary btn btn-block'>Settings</button>"
						"</ul>"+
					"</div>"+
				"</nav>"+
				"<ul class='list-unstyled mt-3 mb-4' id=switchStackUL>" +
				"</ul>" +
			"</div>" +
    	"</div>" +
"</div>"
var keypadHTML