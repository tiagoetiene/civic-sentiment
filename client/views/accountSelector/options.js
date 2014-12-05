Template.OptionsT.helpers({
	group : function() {
		var options = { sort : {type : 1}, fields : { country : true } };
		var countries = _.uniq(AccountsCollection
			.find({}, options)
			.fetch()
			.map(function(d) { return d.country; }), true);
		return countries;
	},
	label : function() {
		return i18n('options.'+String(this));
	},
	listOfPoliticians : function() {
		var options = { sort : {name : 1}, fields : { name : true } };
		return AccountsCollection.find({ country : String( this ) }, options).fetch();
	}
});

Template.OptionsT.rendered = function() {
	$("#e1").selectpicker('render').selectpicker('refresh');
	$("#e1")
		.on("change", function( e ) {
			var names = []
			_.each(e.target, function( t ) {
				if( t.selected === true ) {
					names.push( t.value );
				}
			});
			reactiveUserSelectedNames.set( names );
		});
}


Template.OptionT.rendered = function() {
	$("#e1").selectpicker('render').selectpicker('refresh');
}

updateCandidateOptionsCombobox = function( ) {
	Meteor.setTimeout( function() {
		var names = reactiveSelectedNames.get();
		if( names.length ) {
			$("#e1")
				.selectpicker( "val",  names)
				.selectpicker( "render" )
				.selectpicker( "refresh" );
		}
	}, 5000);
}
