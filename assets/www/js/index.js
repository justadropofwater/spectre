//global functions
function onLoad() {
	document.addEventListener('deviceready', onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener('pause', onPause, false);
	document.addEventListener('resume', onResume, false);
	element.addEventListener('touchstart', function(e) {
		currentTarget.className = 'active';
	});
	document.addEventListener('hidekeyboard', onHide, false); 
    document.addEventListener('showkeyboard', onShow, false);
}
function onPause() {
}
function onResume() {
}
function onHide() { 
    console.log('Got a hide keyboard'); 
} 
function onShow() { 
    console.log('Got a show keyboard'); 
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var watchID = null;



