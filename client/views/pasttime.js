Template.PastTimeT.rendered = function() {
	$("#pastMonth").change( function(e) { timeUpdater("past month"); });
	$("#pastWeek").change( function(e) { timeUpdater("past week"); });
	$("#past3Day").change( function(e) { timeUpdater("past 3 days"); });
	$("#pastDay").change( function(e) { timeUpdater("past day"); });
	$("#past8Hour").change( function(e) { timeUpdater("past 8 hours"); });
	$("#past1Hour").change( function(e) { timeUpdater("past hour"); });
	$("#past5Min").change( function(e) { timeUpdater("past 5 min") });
}

updatePastTimeToggleButtons = function() {
	var t = reactiveTimeframe.get();
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_month" ) == true ) ? $('#past_month').addClass('active') : $('#past_month').removeClass('active');
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_week" ) == true ) ? $('#past_week').addClass('active') : $('#past_week').removeClass('active');
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_3_days" ) == true ) ? $('#past_3_days').addClass('active') : $('#past_3_days').removeClass('active');
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_day" ) == true ) ? $('#past_day').addClass('active') : $('#past_day').removeClass('active');
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_8_hours" ) == true ) ? $('#past_8_hours').addClass('active') : $('#past_8_hours').removeClass('active');
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_hour" ) == true ) ? $('#past_hour').addClass('active') : $('#past_hour').removeClass('active');
	( _.isEqual( t.replace( / /, "_" ).replace( / /, "_" ), "past_5_min" ) == true ) ? $('#past_5_min').addClass('active') : $('#past_5_min').removeClass('active');
}

	