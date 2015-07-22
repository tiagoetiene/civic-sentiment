Template.AccountsT.helpers({
	accounts : function() {
		var names = reactiveUserSelectedNames.get();
		var query = { "person.name" : { $in : names } };
		var array = AccountsCollection.find( query ).fetch();
		return array;
	},
});
