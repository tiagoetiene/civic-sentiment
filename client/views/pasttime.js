Template.PastTimeT.rendered = function() {
	$("#pastMonth").change( function(e) { reactiveUserSelectedTimeframe.set("past month"); });
	$("#pastWeek").change( function(e) { reactiveUserSelectedTimeframe.set("past week"); });
	$("#past3Day").change( function(e) { reactiveUserSelectedTimeframe.set("past 3 days"); });
	$("#pastDay").change( function(e) { reactiveUserSelectedTimeframe.set("past day"); });
	$("#past8Hour").change( function(e) { reactiveUserSelectedTimeframe.set("past 8 hours"); });
	$("#past1Hour").change( function(e) { reactiveUserSelectedTimeframe.set("past hour"); });
	$("#past5Min").change( function(e) { reactiveUserSelectedTimeframe.set("past 5 min") });
}


function updatePastTimeToggleButtons() {
	var now = reactiveNow.get();

	if(now == false) {
		return;
	}
	var startEnd = reactiveStartEndDates.get();
	var interval = startEnd.interval;


	(interval == TotalNumberOfMilliseconds.month) ? $('#past_month').addClass('active') : $('#past_month').removeClass('active');
	(interval == TotalNumberOfMilliseconds.week) ? $('#past_week').addClass('active') : $('#past_week').removeClass('active');
	(interval == TotalNumberOfMilliseconds.three_days) ? $('#past_3_days').addClass('active') : $('#past_3_days').removeClass('active');
	(interval == TotalNumberOfMilliseconds.day) ? $('#past_day').addClass('active') : $('#past_day').removeClass('active');
	(interval == TotalNumberOfMilliseconds.eight_hours) ? $('#past_8_hours').addClass('active') : $('#past_8_hours').removeClass('active');
	(interval == TotalNumberOfMilliseconds.hour) ? $('#past_hour').addClass('active') : $('#past_hour').removeClass('active');
	(interval == TotalNumberOfMilliseconds.five_min) ? $('#past_5_min').addClass('active') : $('#past_5_min').removeClass('active');
}

	