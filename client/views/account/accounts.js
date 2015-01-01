Template.AccountsT.helpers({
	accounts : function() {
		var array = AccountsCollection.find( { "person/name" : { $in : reactiveSelectedNames.get() } } ).fetch();
		console.log( array, reactiveSelectedNames.get() );
		return array;
	},
});

Template.AccountsT.rendered = function() {
	updateAddressBar();
}