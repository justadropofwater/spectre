$('#registerStart').live( 'pageinit',function(event){

	$("#registerName").val(deviceName);
	console.log(deviceName);
	$("#registerModel").val(deviceModel);
	console.log(deviceModel);
	$("#registerOS").val(deviceOS);
	console.log(deviceOS);
	$("#registerOSVersion").val(deviceOSVersion);
	console.log(deviceOSVersion);
	$("#registerUUID").val(deviceUUID);
	console.log(deviceUUID);

});