Template.CandidateNameT.helpers({
	position : function() {
		var name = this["person/name"];
		if( name.match( /Sen\./g ) ) {
			return "Senator";
		} else if ( name.match( /Rep\./g ) ) {
			return "Representative";
		} else if ( name.match( /Vice President/g ) ) {
			return "Vice President";
		} else if ( name.match( /President/g ) ) {
			return "President";
		} 
		return "";
	},
	name : function() {
		var cleanNameRegex = /Sen.|Rep.|Vice President|President/;
		var cleanParty = /\[.+\]/;
		return this["person/name"].replace( cleanNameRegex, "" )
														  .replace( cleanParty, "" ) ;
	},
	color : function() {
		return "black";
	},
	tweets_count : function() {
		var name = this["person/name"];
		var depth = Session.get( "CurrentDepth" );
		return Session.get( "tweets:" + twitterHandleDepthPair( name, depth ) );
	},
	party_icon : function() {
		var name = this["person/name"];
		if ( name.match( /\[D.*\]/ ) ) {
			return "resource/democrat.svg";
		} else if ( name.match( /\[R.*\]/ ) ) {
			return "resource/republican.svg";
		}
		return "";
	}
});