getUserSelectedTime = function() {
	if(this.params.query.timeframe) {
		var timeframe = getTimeFrame( this.params.query.timeframe );
		endDate = new Date();
		startDate = new Date( +endDate + timeframe );
		reactiveNow.set( true );
		reactiveTimeframe.set( this.params.query.timeframe );
	}

	// II. Now that we have the time information, let us process it to figure out
	// which time interval is the most interesting for us
	var exactInterval = (+endDate - (+startDate)) / HistogramBins;
	var depthIntervalPair = findDepthAndInterval( exactInterval );
	depth = depthIntervalPair.depth;
	interval = depthIntervalPair.interval;
}