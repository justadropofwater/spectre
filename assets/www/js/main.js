// buttons and such

// global exit
$(document).on('click', '.exit', function(event, ui) {
	console.log('shutting down');
	navigator.app.exitApp();
});

// contact listing user jump
$(document).on('click', '#userNameRecipient', function(){
	console.log('trying somewhat hard');
	userNameRecipient = $(this).data('username');
	userNameRecipientUUID = $(this).data('uuid');
	console.log(userNameRecipient + ' UUID: ' + userNameRecipientUUID);
	console.log('Attempting to retrieve message history');
	// getMessage payload
	var requestDate = new Date()
	, requestEpoch = requestDate.getTime()
	, payload = {
		type : "getMessages",
		sender : userName,
		recipientUserName : userNameRecipient,
		recipientID: userNameRecipientUUID,
		deviceID : "69696969",
		requestDateClient : requestEpoch
	};

	try {
		console.log(payload);
		var payload = JSON.stringify(payload);
		socket.send(payload);
		console.log('Sent getMessages payload: ' + payload);
	}
	catch (ex)
	{
		console.log('getMessages failed! Error: ' + ex);
		return false;
	}
	return true;
});