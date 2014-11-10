Template.AccountsT.helpers({
	accounts : function() {
		return AccountsCollection.find( { name : { $in : reactiveSelectedNames.get() } } ).fetch();
	},
});

Template.AccountsT.rendered = function() {
	updateAddressBar();
}