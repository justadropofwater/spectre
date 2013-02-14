//start ye' engines

$(document).on("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
//		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.support.cors = true;
	$.mobile.defaultPageTransition = 'slide';
	$.mobile.defaultDialogTransition = 'flip';
	$("[data-role=header]").fixedtoolbar({ transition: "fade" });
	$("[data-role=header]").fixedtoolbar({ tapToggle: false });
	

});

