$('#loginSubmitButton').click(function() {

	console.log('Attempting to request authentication!');
	var userName = $('#loginName').val()
	, passWord = $('#loginPass').val()
	, authRequestDate = new Date()
	, authRequestEpoch = authRequestDate.getTime()
	, payload = {
		type : "authRequest",
		userName : userName,
		password : passWord,
		deviceID : "69696969",
		authRequestDate : authRequestEpoch
	};

	try { 
		console.log(payload);
		ws.send('authRequest', payload);
		status.textContent = 'Authenticated!';
		payload = JSON.stringify(payload);
		$('#log').append('Sent authRequest payload: ' + payload);
	}
	catch (ex)
	{
		status.textContent = 'Authentication failed!';
		$('#log').append('authRequest failed! Error: ' + ex);
		return false;	
	}
	return true;
});