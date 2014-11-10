Template.PastTimeT.rendered = function() {
	$("#pastMonth").change( function(e) { reactiveUserSelectedTimeframe.set("past month"); });
	$("#pastWeek").change( function(e) { reactiveUserSelectedTimeframe.set("past week"); });
	$("#past3Day").change( function(e) { reactiveUserSelectedTimeframe.set("past 3 days"); });
	$("#pastDay").change( function(e) { reactiveUserSelectedTimeframe.set("past day"); });
	$("#past8Hour").change( function(e) { reactiveUserSelectedTimeframe.set("past 8 hours"); });
	$("#past1Hour").change( function(e) { reactiveUserSelectedTimeframe.set("past hour"); });
	$("#past5Min").change( function(e) { reactiveUserSelectedTimeframe.set("past 5 min") });
}


updatePastTimeToggleButtons = function() {
	var now = reactiveNow.get();
	var startEnd = reactiveStartEndDates.get();
	var delta = +startEnd.end - (+startEnd.start);
	var tmp = Infinity;
	var selected = null;
	_.each( TotalNumberOfMilliseconds, function( value, key ) {
		if( Math.abs( value - delta ) < tmp ) {
			tmp = Math.abs( value - delta );
			selected = value;
		}
	});

	(now && selected == TotalNumberOfMilliseconds.month) ? $('#past_month').addClass('active') : $('#past_month').removeClass('active');
	(now && selected == TotalNumberOfMilliseconds.week) ? $('#past_week').addClass('active') : $('#past_week').removeClass('active');
	(now && selected == TotalNumberOfMilliseconds.three_days) ? $('#past_3_days').addClass('active') : $('#past_3_days').removeClass('active');
	(now && selected == TotalNumberOfMilliseconds.day) ? $('#past_day').addClass('active') : $('#past_day').removeClass('active');
	(now && selected == TotalNumberOfMilliseconds.eight_hours) ? $('#past_8_hours').addClass('active') : $('#past_8_hours').removeClass('active');
	(now && selected == TotalNumberOfMilliseconds.hour) ? $('#past_hour').addClass('active') : $('#past_hour').removeClass('active');
	(now && selected == TotalNumberOfMilliseconds.five_min) ? $('#past_5_min').addClass('active') : $('#past_5_min').removeClass('active');
}

	