data = { };
plots = { }
var handlers = { };
var lastDepth = -1;

HistogramBins = 100;

newUpdateData = function() {

	var names = reactiveUserSelectedNames.get();
	var depth = Session.get( "CurrentDepth" );
	var start = new Date( now() - HistogramBins * Session.get( "CurrentInterval" ) );

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
		plots = {};
		handlers = {};
		lastDepth = depth;

	} else {

		//
		// Step I: Stop listening to changes of some of the already retrieved names
		//
		_.each( data, function( value, key ) {
			if( contains( names, key ) == false ) {

				//
				// Stop listening
				// 
				handlers[ key ].stop();

				// 
				// delete unused data
				//
				delete data[ key ];
				delete plots[ key ];
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

	console.log( "* dataUpdater:" ); 
	console.log( "\t* Missing data for the following names:", names )
	console.log( "\t* Current depth:", depth );

	//
	// Observing changes
	// 
	_.each( names, function( name ) { 

		var ready = Session.get( "sub:ready:" + NameToTwitterID[ name ] + ":" + depth );

		console.log( "\t* Name:", "sub:ready:" + NameToTwitterID[ name ] + ":" + depth );
		console.log( "\t\t* Is subscription ready?:", ready );

		if( ready == true ) {

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

			plots[ name ] = Plot();
			console.log( "\t* Querying params", query, options );			
			data[ name ] = TwitterCollection.find( query, options );
			Session.set( "tweets:" + name, 0 );
		}
	} );

	console.log( "* Session keys:", Session.keys );
	console.log( "* End (dataUpdater)\n\n");
}
