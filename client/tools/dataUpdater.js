data = { };
var handlers = { };
var lastDepth = -1;

HistogramBins = 100;

newUpdateData = function() {
	var names = reactiveSelectedNames.get();
	var depth = Session.get( "CurrentDepth" );
	var start = new Date( now() - 100 * Session.get( "CurrentInterval" ) );

	//
	// If no start date was defined, there is nothing to be done
	//
	if( _.isDate( start ) == false ) { return; }


	if( lastDepth != depth ) {

		//
		// We no longer need to listening to changes to any of the current names
		//
		_.each( handlers, function( value, key ) { value.stop(); } );

		//
		// If the current depth differs from previous,
		// then we must retrieve data from scratch
		//
		data = {};
		handlers = {};
		lastDepth = depth;

	} else {
		//
		// We may not have to retrieve data for all politicians. Only to those that
		// we have not yet loaded
		//

		//
		// Step I: Stop listening to changes of some of the already retrieved names
		//
		_.each( data, function( value, key ) {
			if( contains( names, key ) == false ) {

				//
				// Stop listening
				// 
				console.log( "* stopping handler" );
				handlers[ key ].stop();

				// 
				// delete unused data
				//
				delete data[ key ];
				delete handlers[ key ];
			}
		} );

		//
		// Step II: remove names that do not need to be loaded
		//
		names = _.filter( names, function( name ) {
			return _.has( data, name ) == false;
		} );
	
	}

	console.log( "* List of names to be updated: ", names );

	//
	// Observing changes
	// 
	_.each( names, function( name ) { 

		var query = { 
			depth : depth,
			twitter_handle : NameToTwitterID[ name ],
			date : { $gte: +start }
		};
		var options = {
			fields : {
				depth : false,
				twitter_handle : false,
			}
		};		

		data[ name ] = [];
		Session.set( "tweets:" + name, 0 );

		var cursor = TwitterCollection.find( query, options );
		handlers[ name ] = cursor.observeChanges( {
			added : function( id, summary ) {

				//
				// Adding incoming data to the pipeline
				//
				data[ name ].push( summary );

				//
				// Increase tweets counter
				//
				var tweetsRef = "tweets:" + name;
				Session.set( tweetsRef, Session.get( tweetsRef ) + summary.counter );

			}
		} );
	});

	console.log( "* current data: ", data );
}

// updateData = function() {
// 	var startEnd = reactiveStartEndDates.get();
// 	var start = startEnd.start;
// 	var end = startEnd.end;
// 	var depth = startEnd.depth;
// 	var interval = startEnd.interval;
// 	var data = {};
// 	var tweetCount = {};

// 	if(start == undefined || end == undefined) {
// 		console.log( "\t* No date interval was defined yet. Wating for the user. ");
// 		return;
// 	}

// 	console.assert( start <= end );
	
// 	_.each( reactiveSelectedNames.get(), function( name ) { 

// 		// Preparing query. At this point we assume that all data is available
// 		// on minimongo
// 		var query = { 
// 			depth : depth,
// 			twitter_handle  : NameToTwitterID[ name ],
// 			date : {  $gte: +start }
// 		};
// 		var options = {
// 			fields : {
// 				depth : false,
// 				twitter_handle : false,
// 			}
// 		};

// 		// console.log( JSON.stringify( query ) );
		
// 		var ret = TwitterCollection.find( query, options ).fetch();
// 		var tweets_count = 0;

// 		_.each(ret, function( d ) { tweets_count += d.counter; });

// 		// console.log( ret )
// 		// console.log( name, tweets_count )


// 		var max = d3.max( ret, function(d) { return Math.abs( d.sentiment ) } );
// 		// max = Math.max(max, d3.max( ret, function(d) { return Math.abs(d.negative_sentiment)} ));
// 		if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].sentiment /= max } );
// 		// if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].sentiment /= max } );

// 		var minDate = Math.floor( +start / interval ) * interval;
// 		var out = [];
// 		var i = 0;
// 		var j = 0;
// 		while(+minDate < +end) {
// 			if(j < ret.length && +ret[j].date == +minDate) {
// 				out[i] = ret[j];
// 				++j;
// 			}
// 			else {
// 				out[i] = { 
// 					counter : 0,
// 					date : +minDate,
// 					// negative_counter : 0,
// 					// negative_sentiment : 0,
// 					// positive_counter : 0,
// 					// positive_sentiment : 0,
// 					sentiment : 0,
// 				}	
// 			}
// 			minDate += interval;
// 			i++;
// 		}
		
// 		data[ name ] = out;
// 		tweetCount[ name ] = tweets_count;
// 		// Signaling to the user that the new data has just came in
// 		// Session.set( candidate.name, candidate.tweets_count );
// 		// setTimeout( function() { Session.set(candidate.name+':color', 'color:black'); }, 3000);
// 	});
	
// 	reactiveData.set( data );
// 	reactiveTweetCount.set( tweetCount );
// }