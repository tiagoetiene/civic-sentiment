data = { };
plots = { }

HistogramBins = 100;

function observeData( twitterHandle, depth, start, onAdd ) {
	console.log( "* observeData");
	var query = { 
		depth : depth,
		twitter_handle : twitterHandle,
		date : { $gte: +start }
	};

	var options = {
		fields : {
			depth : false,
			twitter_handle : false,
		}
	};

	var handle = TwitterCollection.find( query, options );
	handle.observeChanges( { added : onAdd } );

	console.log( "* End (observeData)\n\n");
	return handle;
}

newUpdateData = function() {
	console.log( "* Data updater");

	var start = new Date( now() - HistogramBins * Session.get( "CurrentInterval" ) );

	//
	// If no start date was defined, there is nothing to be done
	//
	if( _.isDate( start ) == false ) { return; }


	var names = reactiveUserSelectedNames.get();
	var depth = Session.get( "CurrentDepth" );


	//
	// Build the list of names that we will work with
	// We will subscribe only to names that have not been yet subscribed to
	// 
	var nameDepthList = [];
	_.each( names, function( name ) {
		var key = twitterHandleDepthPair( name, depth );
		if( _.has( data, key ) == false ) {
			nameDepthList.push( key );	
		}
	} );


	//
	// Delete unused data
	//
	_.each( data, function( datum, nameDepth ) {
		if( _.has( nameDepthList, nameDepth ) == false ) {
			delete data[ nameDepth ];
			delete plots[ nameDepth ];
		}
	} );


	//
	// Observing changes
	// 
	_.each( nameDepthList, function( nameDepth ) { 
			
			var twitterHandle = nameDepth.substring( 0, nameDepth.indexOf( ":" ) );

			plots[ nameDepth ] = Plot();
			data[ nameDepth ] = [];
			
			function onAdd( id, summary ) {
				data[ nameDepth ].push( summary );
			}

			Meteor.defer( function() {
				observeData( twitterHandle, depth, start, onAdd );
			} );
	} );

	console.log( "* Session keys:", Session.keys );
	console.log( "* End (dataUpdater)\n\n");
}