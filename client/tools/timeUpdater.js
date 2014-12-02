timeUpdater = function( timeframe ) {
	var startDate;
	var endDate;

	if(timeframe) {
		var period = getTimeFrame( timeframe );
		endDate = new Date();
		startDate = new Date( +endDate + period );
		reactiveNow.set( true );
		reactiveTimeframe.set( timeframe );
	}

	var exactInterval = (+endDate - (+startDate)) / HistogramBins;
	var depthIntervalPair = findDepthAndInterval( exactInterval );
	depth = depthIntervalPair.depth;
	interval = depthIntervalPair.interval;

	var data = { 
			start : startDate, 
			end : endDate, 
			depth : depth,
			interval : interval
		};
	reactiveStartEndDates.set( data );
	return data;
}