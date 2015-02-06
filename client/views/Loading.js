Template.LoadingT.helpers( {
	color : function() {	
		var party = this["party"].toLowerCase();
		if( _.isEqual( party, "republican" ) ) {
			return "progress-bar-danger";
		}
		else if( _.isEqual( party, "democrat" ) ) {
			return "";
		}
		return "progress-bar-warning";
	},
	name : function() {
		return this["person/firstname"];
	}
} );