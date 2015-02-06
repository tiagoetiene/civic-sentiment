Template.PastTimeT.rendered = function() {
	$("#pastMonth").change( function(e) { 
		
		var milliseconds = getTimeFrame("past month");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
	$("#pastWeek").change( function(e) { 

		var milliseconds = getTimeFrame("past week");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins  );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
	$("#past3Day").change( function(e) { 

		var milliseconds = getTimeFrame("past 3 days");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins  );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
	$("#pastDay").change( function(e) { 

		var milliseconds = getTimeFrame("past day");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins  );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
	$("#past8Hour").change( function(e) { 

		var milliseconds = getTimeFrame("past 8 hours");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins  );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
	$("#past1Hour").change( function(e) { 

		var milliseconds = getTimeFrame("past hour");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins  );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
	$("#past5Min").change( function(e) { 

		var milliseconds = getTimeFrame("past 5 min");
		var depthIntervalPair = findDepthAndInterval( Math.abs( milliseconds ) / HistogramBins  );

		Session.set( "CurrentDepth", depthIntervalPair.depth-1 );
		Session.set( "CurrentInterval", Math.abs( milliseconds ) / HistogramBins );
	});
}

updatePastTimeToggleButtons = function() {
	var t = reactiveTimeframe.get();
	( _.isEqual( t.replace( / /g, "_" ), "past_month" ) == true ) ? $('#past_month').addClass('active') : $('#past_month').removeClass('active');
	( _.isEqual( t.replace( / /g, "_" ), "past_week" ) == true ) ? $('#past_week').addClass('active') : $('#past_week').removeClass('active');
	( _.isEqual( t.replace( / /g, "_" ), "past_3_days" ) == true ) ? $('#past_3_days').addClass('active') : $('#past_3_days').removeClass('active');
	( _.isEqual( t.replace( / /g, "_" ), "past_day" ) == true ) ? $('#past_day').addClass('active') : $('#past_day').removeClass('active');
	( _.isEqual( t.replace( / /g, "_" ), "past_8_hours" ) == true ) ? $('#past_8_hours').addClass('active') : $('#past_8_hours').removeClass('active');
	( _.isEqual( t.replace( / /g, "_" ), "past_hour" ) == true ) ? $('#past_hour').addClass('active') : $('#past_hour').removeClass('active');
	( _.isEqual( t.replace( / /g, "_" ), "past_5_min" ) == true ) ? $('#past_5_min').addClass('active') : $('#past_5_min').removeClass('active');
}

	