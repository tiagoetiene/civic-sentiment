var reactivePoliticianSubscriptionHandler = new ReactiveVar( Meteor.subscribe( "accounts" ), _.isEqual );

Template.OptionsT.helpers({
	dataIsLoaded : function() {
		return reactivePoliticianSubscriptionHandler.get().ready();
	},
	state : function() {
		var options = { sort : { "state" : 1 }, 
			fields : { "state" : true }
		};
		var politicians = AccountsCollection.find( {}, options ).fetch();
		return _.uniq( politicians.map( function( d ) { return d["state"]; } ) );
	},
	label : function() {
		var state = String(this);
		if(_.isEmpty( state )) {
			return "";
		}
		return i18n( "options." + String( this ) );
	},
	politiciansPerState : function() {
		var options = { 
			sort : {"person.name" : 1}, 
			fields : { "person.name" : true, "person.twitterid" : true },
		};
		return AccountsCollection.find( { "state" : String( this ) }, options).fetch();
	}
});

Template.OptionsT.created = function() {
}

Template.ListOfPoliticiansT.rendered = function() {

	//
	// Hack needed to 
	//
	var handle = setInterval( function() {
		var selection = $( "#e1" );
		if( _.isUndefined( selection[ 0 ] ) == false ) {

			selection
				.selectpicker( "render" )
				.on( "change", function( e ) {
					
					var names = []
					_.each(e.target, function( t ) {
						if( t.selected === true ) {
							names.push( t.value );
						}
					});

					reactiveUserSelectedNames.set( names );

				});
				clearInterval( handle );
		}
	}, 200 );
}

Template.OptionT.rendered = function() {
}

Template.OptionT.helpers({
	partyIcon : function() {
		var name = this["person"]["name"];
		if( name.search(/\[D.*\]/ ) != -1 )
			return "Dem";
		else if( name.search(/\[R.*\]/ ) != -1 )
			return "Rep";
		return "";
	}
});

Template.OptionT.helpers( {
	name : function() {
		// return this["person/name"].replace(/ *\[.*\]/, "");
		NameToTwitterID[ this["person"]["name"] ] = this["person"]["twitterid"].toLowerCase();
		return this["person"]["name"];
	}
});
