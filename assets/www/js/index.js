//global vars
var watchID
	, deviceName
	, deviceModel
	, deviceOS
	, deviceOSVersion
	, deviceUUID
	, userName
	, password
	, uid
	, socket
	, userNameRecipient
	, userNameRecipientUUID;

//global functions
var connect = function() {
	socket = new WebSocket("ws://192.168.1.5:8080");
	socket.onopen = function() {
		console.log('connected to ' + socket);
	};
	socket.onmessage = function (event) {
		console.log('incoming message');

		try {
			console.log('try..hard..');
			var data = JSON.parse(event.data);
			//debug - find them nasty keys
			$.each(data, function(key, value) {
				console.log('key: ' + key + ', value: ' + value)
			});
			console.log('switch to ' + data.type);
			switch (data.type) {

				case 'welcome' :
					console.log(data.message);
				break;
				
				// newUser
				case "userSaved":
					uid = data.uid;
					console.log(uid);
					console.log('Response: ' + data.message);
				break;

				case 'authRequestSucess':
					$("input[id='loginName']").val('');
					$("input[id='loginPass']").val('');
					console.log('Response: ' + data.message);
					userName = data.userName;
					console.log('userName: ' + userName);
					uid = data.uid;
					console.log('uid: ' + uid);
					$.mobile.changePage('#account');
				break;

				case 'authRequestNull':
					var responseMessage = data.message;
					console.log('Response: ' + responseMessage);
					//$.dynamic_popup(responseMessage);
					$.dynamic_popup({
						content: responseMessage, 
						closeBtnLabel: 'Ok',
						popupId: 'loadUserResponseDialog'
					}).bind({
						popupafterclose: function(e){
							console.log('hi there');
						}
					});
				break;

				case 'authRequestFailure':
					responseMessage = data.message;
					console.log('Response: ' + responseMessage);
					$.dynamic_popup({
						content: responseMessage, 
						closeBtnLabel: 'Ok',
						popupId: 'loadUserResponseDialog'
					}).bind({
						popupafterclose: function(e){
							console.log('hi there');
						}
					});
				break;

				case 'getContacts':
					var contactPayload = JSON.parse(data.message);
					console.log(contactPayload);
					for (var i=0, j=contactPayload.length; i < j; i++) {
						console.log('key: ' + contactPayload[i].userName + ', value: ' + contactPayload[i]._id);
						var contactsList = $('#contactsList')
						, contactsListContact;
						console.log('grabbed ' + contactsList);
						// add the new item to the list
						$(contactsList).append('<li class="ui-icon-nodisc" data-theme="b" data-icon="circle-arrow-right" data-iconshadow="false" data-shadow="false"><a id="userNameRecipient" href="#user" data-username="' + contactPayload[i].userName + '" data-uuid="' + contactPayload[i]._id + '" class="ui-icon-nodisc">' + contactPayload[i].userName + '</a></li>');
						console.log('contact added to list');
					};
					// read all list items (without list-dividers) into an array
					contactsListContact = $('#contactsList li').not('.ui-li-divider').get();
					// sort the list items in the array
					contactsListContact.sort(function(a, b){
						var valA = $(a).text()
						, valB = $(b).text();
						if (valA < valB){
							return -1;
						} if (valA > valB){
							return 1;
						} return 0;
					});
					// clear the listview before rebuild
					contactsList.empty();
					// adding the ordered items to the listview
					$.each(contactsListContact, function(i, li){
						contactsList.append(li);
					});
					contactsList.listview('refresh');
				break;

				case 'getMessagesResponseNull':
				console.log(data);
				console.log(JSON.stringify(data));
					var responseMessage = data.message
					, responseMessagesList = $('#userNameRecipientMessagesList');
					console.log('Response: ' + responseMessage);
					$(responseMessagesList).html('<li><div class="getMessagesResponseNull">' + responseMessage + '</div></li>');
					responseMessagesList.listview('refresh');
					console.log('processed getMessagesResponseNull payload');
				break;

				case 'newMessage':
					console.log('New Message: ' + data.message);
				break;

			}
		}
		catch (error) {
			console.log('There has been an error parsing your JSON.');
			console.log(error);
		}
	}
};

var startApp = function() {
	console.log('FIRE FIRE FIRE');
	connect();
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
		document.addEventListener('backbutton', function(e){
			if($.mobile.activePage.is('#accounts')){
				e.preventDefault();
				navigator.app.exitApp();
			}
			else {
				navigator.app.backHistory()
			}
		}, false);
	initApp();
};

var onMobileInit = function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	jqm_mobile_init = true;
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$('[data-role=header]').fixedtoolbar({ tapToggle: false });
	$.mobile.listview.prototype.options.autodividersSelector = function(elt){
		var text = $.trim(elt.text()) || null;
		if ( !text ){
			return null;
		}
		if (!isNaN(parseFloat(text))){
			return "0-9";
		} else {
			text = text.slice(0, 1).toUpperCase();
			return text;
		}
	};
	initApp();
};

$(document).bind('mobileinit', onMobileInit);
	document.addEventListener("deviceready", onDeviceReady, false);
	deviceName = device.name;
	deviceModel = device.model;
	deviceOS = device.platform;
	deviceOSVersion = device.version;
	deviceUUID = device.uuid;
	console.log(deviceName + ', ' + deviceModel +', ' + deviceOS + ', ' + deviceOSVersion + ', ' + deviceUUID);
	console.log('initiating jqm');
})();


// what the fuck ever
$('.exit').live('click', function(event, ui) {
	navigator.app.exitApp();
});