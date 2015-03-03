var subscriptionHandleList = {};

subscribeToPolitician = function( twitterHandle, depth ) {
	console.log( "* subscribeToPolitician", twitterHandle, depth );
	var handleDepthPair = twitterHandle + ":" + depth;
	Session.set( "sub:ready:" + handleDepthPair, false );	
	console.log( "* End (subscribeToPolitician)\n\n" );
	return Meteor.subscribe( "summary:" + twitterHandle, depth, function() {
			Session.set( "sub:ready:" + handleDepthPair, true );					
	} );
	console.log( "* End (subscribeToPolitician)" );
}

subscribeToUserSelectedPoliticians = function( ) {
	console.log( "* subscribeToUserSelectedPoliticians" );

	var depth = Session.get( "CurrentDepth" );
	var names = reactiveUserSelectedNames.get();


	//
	//
	//
	var nameDepthAll = [];
	_.each( names, function( name ) {
		nameDepthAll.push( twitterHandleDepthPair( name, depth ) ); 
	} );

	//
	// Build the list of names that we will work with
	// We will subscribe only to names that have not been yet subscribed to
	// A subscription is identified by concatenating "@screen_name + depth"
	// 
	var nameDepthList = [];
	_.each( names, function( name ) {
		var key = twitterHandleDepthPair( name, depth );
		if( _.has( subscriptionHandleList, key ) == false ) {
			nameDepthList.push( key );	
		}
	} );


	//
	// Unsubscribe to some of the current subscriptions
	//
	_.each( subscriptionHandleList, function( handle, nameDepth ) {
		if( _.contains( nameDepthAll, nameDepth ) == false ) {
			console.log( "\t* deleting handle", nameDepth )
			handle.stop();
			delete subscriptionHandleList[ nameDepth ];
		}
	} );


	//
	// Subscribing to those names
	//	
	_.each( nameDepthList, function( nameDepth ) {
		var twitterHandle = nameDepth.substring(0,nameDepth.indexOf(":"));
		Meteor.defer( function() {
				var handle = subscribeToPolitician( twitterHandle, depth );
				console.assert( _.has( subscriptionHandleList, nameDepth ) == false );
				subscriptionHandleList[ nameDepth ] = handle;
		} );
	} );
	
	console.log( "* End (subscribeToUserSelectedPoliticians)\n\n");
}

