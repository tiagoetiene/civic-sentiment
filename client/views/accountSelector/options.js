Template.OptionsT.helpers({
	group : function() {
		var options = { sort : {type : 1}, fields : { type : true } };
		var types = _.uniq(AccountsCollection
			.find({}, options)
			.fetch()
			.map(function(d) { return d.type; }), true);
		return types;
	},
	label : function() {
		return i18n('options.'+String(this));
	},
	listOfPoliticians : function() {
		var options = { sort : {name : 1}, fields : { name : true } };
		return AccountsCollection.find({ type : String( this ) }, options).fetch();
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
		console.log("start");
		console.log(names);
		if( names.length ) {
			$("#e1")
				.selectpicker( "val",  names)
				.selectpicker( "render" )
				.selectpicker( "refresh" );
		}
		console.log("end");
	}, 5000);
}
