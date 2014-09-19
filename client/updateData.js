data = { };

function getIndex( interval ) {
	var idx;
	var milliseconds = 1000;
	for(idx = 0; idx < 14; ++idx) {
		if(milliseconds >= interval)
			break;
		milliseconds *= 2;
	}
	return { depth : idx , interval : milliseconds };
}

updateData = function() {
	Deps.autorun( function () {
		var past = getTimeFrame();
		var _now = new Date();
		var _past = getPast( _now, past );
		var bins = 100;
		var time_interval = Math.floor( Math.abs( past / bins ) );
		var pair = getIndex( time_interval );

		for(var i = 0; i < Politicians.size(); ++i)
			if(Politicians( i ).selected !== true)
				data[ Politicians( i ).name ] = undefined;
		
		_.each( Politicians(), function(candidate, idx) { 
			if(candidate.selected) {
				var r = TwitterCollection.findOne( { name : candidate.name, depth : pair.depth } );
				if(r !== undefined) {
					var ret = _.filter(r.data, function(d) {  return +d.date >= +_past; });
								
					Politicians( idx ).tweets_count = 0;
					_.each(ret, function(d) { Politicians( idx ).tweets_count += d.counter; });

					Session.set( candidate.name, Politicians( idx ).tweets_count );
					setTimeout( function() { Session.set(candidate.name+':color', 'color:black'); }, 3000);

					var max = d3.max( ret, function(d) { return d.positive_sentiment } );
					max = Math.max(max, d3.max( ret, function(d) { return Math.abs(d.negative_sentiment)} ));
					if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].positive_sentiment /= max } );
					if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].negative_sentiment /= max } );

					var minDate = Math.floor( +_past / pair.interval ) * pair.interval;
					var out = [];
					var i = 0;
					var j = 0;
					while(+minDate < +_now) {
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
						minDate += pair.interval;
						i++;
					}
					Politicians( idx ).data = out;
				}
			}
		});
	});
}