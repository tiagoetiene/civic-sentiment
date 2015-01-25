Template.AccountT.helpers({
	subscriptionIsReady : function() {
		var handle = twitterIdKey( this[ "person/twitterid" ] );
		return Session.get( "sub:ready:" + handle );
	}
});