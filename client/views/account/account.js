Template.AccountT.helpers({
	subscriptionIsReady : function() {
		var handle = twitterIdKey( this[ "person/twitterid" ] );
		var subId = "sub:ready:" + handle + ":" + Session.get( "CurrentDepth" );
		return Session.get( subId );
	}
});