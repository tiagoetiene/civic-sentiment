Template.CandidateNameT.helpers({
	position : function() {
		var name = this["person"]["name"];

		if ( name.match( /Hillary Clinton/g ) ) {
			return "Candidate for Democratic Nomination";
		} else if ( name.match( /Donald Trump/g ) ) {
			return "Candidate for Republican Nomination";
		} else if ( name.match( /Bernie/g ) ) {
			return "Candidate for Democratic Nomination";
		} else if ( name.match( /Rubio/g ) ) {
			return "Former Candidate for Republican Nomination";
		} else if ( name.match( /Ted Cruz/g ) ) {
			return "Candidate for Republican Nomination";
		} else if ( name.match( /John Kasich/g ) ) {
			return "Candidate for Republican Nomination";
		} 

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
		return this["person"]["name"].replace( cleanNameRegex, "" )
														  .replace( cleanParty, "" ) ;
	},
	color : function() {
		return "black";
	},
	tweets_count : function() {
		var name = this["person"]["name"];
		var depth = Session.get( "CurrentDepth" );
		return Session.get( "tweets:" + twitterHandleDepthPair( name, depth ) );
	},
	party_icon : function() {
		var name = this["person"]["name"];
		if ( name.match( /\[D.*\]/ ) ) {
			return "resource/democrat.svg";
		} else if ( name.match( /\[R.*\]/ ) ) {
			return "resource/republican.svg";
		} else if ( name.match( /Hillary Clinton/ ) ) {
			return "resource/democrat.svg";
		}
		return "";
	}
});