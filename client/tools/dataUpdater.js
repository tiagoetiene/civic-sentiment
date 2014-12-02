data = { };

HistogramBins = 100;

updateData = function() {
	var startEnd = reactiveStartEndDates.get();
	var start = startEnd.start;
	var end = startEnd.end;
	var depth = startEnd.depth;
	var interval = startEnd.interval;
	var data = {};
	var tweetCount = {};

	if(start == undefined || end == undefined) {
		console.log( "\t* No date interval was defined yet. Wating for the user.... ");
		return;
	}
	
	_.each( reactiveSelectedNames.get(), function( name ) { 

		// Preparing query. At this point we assume that all data is available
		// on minimongo
		var query = { 
			name 	: name, 
			depth 	: depth, 
			date 	: {  $gte: +start, $lt : +end }
		} ;
		var ret = TwitterCollection.find( query ).fetch();
		var tweets_count = 0;
		_.each(ret, function( d ) { tweets_count += d.counter; });

		var max = d3.max( ret, function(d) { return d.positive_sentiment } );
		max = Math.max(max, d3.max( ret, function(d) { return Math.abs(d.negative_sentiment)} ));
		if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].positive_sentiment /= max } );
		if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].negative_sentiment /= max } );

		var minDate = Math.floor( +start / interval ) * interval;
		var out = [];
		var i = 0;
		var j = 0;
		while(+minDate < +end) {
			if(j < ret.length && +ret[j].date == +minDate) {
				out[i] = ret[j];
				++j;
			}
			else {
				out[i] = { 
					counter : 0,
					date : +minDate,
					negative_counter : 0,
					negative_sentiment : 0,
					positive_counter : 0,
					positive_sentiment : 0,
					sentiment : 0,
				}	
			}
			minDate += interval;
			i++;
		}
		
		data[ name ] = out;
		tweetCount[ name ] = tweets_count;
		// Signaling to the user that the new data has just came in
		// Session.set( candidate.name, candidate.tweets_count );
		// setTimeout( function() { Session.set(candidate.name+':color', 'color:black'); }, 3000);
	});
	
	reactiveData.set( data );
	reactiveTweetCount.set( tweetCount );
}