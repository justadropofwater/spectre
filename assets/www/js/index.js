//global vars
var watchID
	, deviceName
	, deviceModel
	, deviceOS
	, deviceOSVersion
	, deviceUUID
	, userName
	, password
	, uid;

//global functions

var startApp = function() {
	url = 'ws://localhost:8080'
	, ws = $.websocket(url, {
		open: function() {
		//add disabled/enabled register and login buttons
			console.log('Connected to ' + url);
		},
		close: function() {

			console.log('Disconnected from ' + url);
		},
		events: {
			message: function(e) {
				try {
					var data = JSON.parse(e);
					console.log(data);
					console.log('switch to ' + data.type);
					switch (data.type) {

						case 'userSaved':
							console.log(uid);
							console.log('Response: ' + data.message);
						break;
	
						case 'authRequest':
							$("input[id='loginName']").val('');
							$("input[id='loginPass']").val('');
							console.log('Response: ' + data.message);
							userName = data.userName;
							console.log('userName: ' + userName);
							uid = data.uid;
							console.log('uid: ' + uid);
							$.mobile.changePage( '#account', { transition: 'flip'} );
						break;
	
						case 'getContacts':
							// potential hazard
							var contacts = eval('(' + data.message + ')')
							, i;
	
							for (i = 0; i < contacts.length; i++) {
								console.log(contacts[i]);
								var username = contacts[i].userName
								, userID = contacts[i]._id;
	
							console.log('User: ' + username);
							}
	
							break;
	
						case 'newMessage':
							console.log('New Message: ' + data.message);
						break;
						
					}
				}
				catch (ex) {
					console.log('There has been an error parsing your JSON.');
					console.log(ex);
				}
			}
		}
	});
};

(function() {
  var device_ready = false;
  var jqm_mobile_init = false;

  var initApp = function() {
    if ((device_ready && jqm_mobile_init) || (jqm_mobile_init && !mobile_system)) {
      startApp();
    }
  };

  var onDeviceReady = function() {
    device_ready = true;
    //alert('dev ready');
    initApp();
  };

  var onMobileInit = function() {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    jqm_mobile_init = true;
    //alert('jqm ready');
    initApp();
  };

  $(document).bind('mobileinit', onMobileInit);
  document.addEventListener("deviceready", onDeviceReady, false);
})();
/*
	
	
	function onDeviceReady() {
	//	document.addEventListener('pause', onPause, false);
	//	document.addEventListener('resume', onResume, false);
		
	//	element.addEventListener('touchstart', function(e) {
	//		currentTarget.className = 'active';
	//	});
		
	//	document.addEventListener('hidekeyboard', onHide, false); 
	//	document.addEventListener('showkeyboard', onShow, false);
		
		deviceName = device.name;
		deviceModel = device.model;
		deviceOS = device.platform;
		deviceOSVersion = device.version;
		deviceUUID = device.uuid;
	
	}
	
	function onLoad() {
		document.addEventListener('deviceready', onDeviceReady, false);
		console.log('loaded');
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
*/