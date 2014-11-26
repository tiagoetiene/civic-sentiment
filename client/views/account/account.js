Template.AccountT.helpers({
	subscriptionIsReady : function() {
		var handle  = reactiveSubscriptionHandle.get();
		if(handle != undefined)
			return handle.ready();
		return false;
	}
});