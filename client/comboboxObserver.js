
getTimeFrame = function() {
	var time = urlParamTimeframe.get();
	if (time.indexOf('past month') !== -1) return -31 * 24 * 60 * 60 * 1000;
	if (time.indexOf('past week') !== -1) return - 7 * 24 * 60 * 60 * 1000;
	if (time.indexOf('past 3 days') !== -1) return - 3 * 24 * 60 * 60 * 1000;
	if (time.indexOf('past day') !== -1) return - 24 * 60 * 60 * 1000;
	if (time.indexOf('past 8 hours') !== -1)  return -  8 * 60 * 60 * 1000;
	if (time.indexOf('past hour') !== -1) return -  1 * 60 * 60 * 1000;
	if (time.indexOf('past 5 min') !== -1) return -  5 * 60 * 1000;
}

function updateTimeframeData() {
	$("#pastMonth").change( function(e) {  urlParamTimeframe.set("past month"); });
	$("#pastWeek").change( function(e) {  urlParamTimeframe.set("past week"); });
	$("#past3Day").change( function(e)	 {  urlParamTimeframe.set("past 3 days"); });
	$("#pastDay").change( function(e)	 {  urlParamTimeframe.set("past day"); });
	$("#past8Hour").change( function(e) {  urlParamTimeframe.set("past 8 hours"); });
	$("#past1Hour").change( function(e) {  urlParamTimeframe.set("past hour"); });
	$("#past5Min").change( function(e){  urlParamTimeframe.set("past 5 min") });
}

function updateSelector() {
	$("#e1").select({placeholder: i18n("selectPolitician")})
		.on("change", function(e) {
			var selected = e.target;
			var names  = [];
			for(var i = 0; i < Politicians.size(); ++i)
				if(selected[i + 1].selected ==  true) {
					names.push( Politicians( i ).name );
					Politicians( i ).selected = true;
				}
				else
					Politicians( i ).selected = false;
			urlParamSelected.set( names );
		}).selectpicker('refresh')
		  .selectpicker('render');
}


comboboxObserver = function() {

	updateSelector();
	updateTimeframeData();

	updateComboBox = Deps.autorun( function () {
		$("#e1").selectpicker('val', urlParamSelected.get())
				.selectpicker('refresh')
				.selectpicker('render');
	});

	updateURL = Deps.autorun( function () {	
		var goToURL = "/realtime?politicians=";
		_.each(urlParamSelected.get(), function(name) { goToURL += name + "," });
		goToURL += "&timeframe=" + urlParamTimeframe.get();
		Router.go(goToURL);
	});


	updateTimeSelector = Deps.autorun( function () {
		var time = urlParamTimeframe.get();
		(time.indexOf('past month') !== -1) ? $('#past_month').addClass('active') : $('#past_month').removeClass('active');
		(time.indexOf('past week') !== -1) ? $('#past_week').addClass('active') : $('#past_week').removeClass('active');
		(time.indexOf('past 3 days') !== -1) ? $('#past_3_days').addClass('active') : $('#past_3_days').removeClass('active');
		(time.indexOf('past day') !== -1) ? $('#past_day').addClass('active') : $('#past_day').removeClass('active');
		(time.indexOf('past 8 hours') !== -1) ? $('#past_8_hours').addClass('active') : $('#past_8_hours').removeClass('active');
		(time.indexOf('past hour') !== -1) ? $('#past_hour').addClass('active') : $('#past_hour').removeClass('active');
		(time.indexOf('past 5 min') !== -1) ? $('#past_5_min').addClass('active') : $('#past_5_min').removeClass('active');
	});
}

