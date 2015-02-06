var currentSubscrptionHandles = {};
var currentNameDepthList = [];

function key( name, depth ) {
	return NameToTwitterID[ name ] + ":" + depth;
}

subscribeToUserSelectedPoliticians = function( ) {
	console.log( "* subscribeToPolitician method" );

	var depth = Session.get( "CurrentDepth" );

	//
	// Build the list of names that we will work with
	// 
	var nameDepthList = [];
	_.each( reactiveUserSelectedNames.get(), function( name ) {
		nameDepthList.push( key( name, depth ) );
	} );

	//
	// We store in this variable all subscriptions that are no longer needed.
	//
	var unusedSub = _.filter( currentNameDepthList, function( nameDepth ) {
		return contains( nameDepthList, nameDepth ) == false;
	} );
	console.log( "\t* Unsubscribing to", unusedSub );


	//
	// We store in this variable all subscriptions that still need to be loaded
	//
	var newSub = _.filter( nameDepthList, function( nameDepth ) {
		return true;
	} );
	console.log( "\t* Subscribing to", newSub );


	//
	// Stop listenting to any changes to the unused subscriptions
	//
	_.each( unusedSub, function( nameDepth ) {
		
		currentSubscrptionHandles[ nameDepth ].stop()
		
		delete currentSubscrptionHandles[ nameDepth ];
		delete Session.keys[ "sub:ready:" + nameDepth ];

		console.log( "\t\t* Removing session var", "sub:ready:" + nameDepth );
	} );

	
	_.each( newSub, function( nameDepth ) {
		var twitterHandle = nameDepth.substring(0,nameDepth.indexOf(":"));
		var subscriptionHandle = Meteor.subscribe( "summary:" + twitterHandle, depth );
		currentSubscrptionHandles[ nameDepth ] = subscriptionHandle;
	
		Session.set( "sub:ready:" + nameDepth, false );		

		//
		// Set session variable "sub:read:@...." to true when the subscripton data is
		// ready and stop the autorun
		//
		var trackerHandle = Tracker.autorun( function waitForSubscription() {
			console.log( "* Tracker.autorun waitForSubscription" );
			if( subscriptionHandle.ready() ) {
				console.log( "\t* Subsciption is ready!" );
				Session.set( "sub:ready:" + nameDepth, true );
				if( _.isUndefined( trackerHandle ) == false )
					trackerHandle.stop();
			} else {
				console.log( "\t* Hang on.... Subscription is not ready..." );
			}
			console.log( "* End (Tracker)" );
		} );
	} );
	
	currentNameDepthList = [];
	_.each( nameDepthList, function( nameDepth ) {
		currentNameDepthList.push( nameDepth );
	} );
	

	console.log( "\t* Current names", currentNameDepthList );
	console.log( "\t* Current sub handles", currentSubscrptionHandles );
	console.log( "* End\n\n");
}