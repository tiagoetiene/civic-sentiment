var reactivePoliticianSubscriptionHandler = new ReactiveVar( Meteor.subscribe( "accounts" ), _.isEqual );

Template.OptionsT.helpers({
	dataIsLoaded : function() {
		return reactivePoliticianSubscriptionHandler.get().ready();
	},
	group : function() {
		var options = { sort : { "state" : 1 }, fields : { "state" : true } };
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
	listOfPoliticians : function() {
		var options = { sort : {"person/name" : 1}, fields : { "person/name" : true } };
		return AccountsCollection.find( { "state" : String( this ) }, options).fetch();
	}
});

Template.OptionsT.created = function() {
	Session.set( "politicianCount", 0 );
}

Template.OptionsT.rendered = function() {
}

Template.OptionT.rendered = function() {
	Session.set( "politicianCount" , Session.get( "politicianCount" ) + 1);
}

Template.OptionT.helpers({
	partyIcon : function() {
		var name = this["person/name"];
		if( name.search(/\[D.*\]/ ) != -1 )
			return "Dem";
		else if( name.search(/\[R.*\]/ ) != -1 )
			return "Rep";
		return "";
	}
});

Template.OptionT.helpers( {
	name : function() {
		return this["person/name"].replace(/ *\[.*\]/, "");
	}
});

updateCandidateOptionsCombobox = function( ) {

	Tracker.autorun( function() {
		if( Session.get( "politicianCount" ) == AccountsCollection.find( {} ).count() ) {
			$( "#e1" )
				.selectpicker( "render" )
				.selectpicker( "refresh" );
			$( "#e1" )
				.on( "change", function( e ) {
					var names = []
					_.each(e.target, function( t ) {
						if( t.selected === true ) {
							names.push( t.value );
						}
					});
					reactiveUserSelectedNames.set( names );
				});
			Session.set( "politicianCount", 0 );
		}
	});

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
