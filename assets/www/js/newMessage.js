$('#messageNew').on('pagecreate',function(event){
	$(function(){
		$('#messageNewContacts').mobiscroll().select({
				theme: 'android-ics light',
				display: 'bottom',
				animate: 'slideup',
				mode: 'scroller',
				width: 50,
				inputClass: 'i-txt',
				group: true,
				label: 'Name',
				groupLabel: 'A-Z',
				setText: 'Select'
			});
	});
	$('.dod').click(function() {
		$(this).toggleClass('ui-btn-active ui-state-persist');
	});
	$('.persist').click(function() {
		$(this).toggleClass('ui-btn-active ui-state-persist');
	});
	$('.receipt').click(function() {
		$(this).toggleClass('ui-btn-active ui-state-persist');
	});
});