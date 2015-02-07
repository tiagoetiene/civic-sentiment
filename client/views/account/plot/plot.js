Template.PlotT.created =  function() {
}

Template.PlotT.helpers({
	plot : function() {
		var name = this["person/name"];
		var depth = Session.get( "CurrentDepth" );
		var nameDepth = twitterHandleDepthPair( name, depth );

		return ("plot-" + nameDepth)
					.replace( "@", "" )
					.replace( ":", "_" )
					.replace( / /g, "_" )
					.replace( /\./g, "_" )
					.replace( /\[/g, "_" )
					.replace( /\]/g, "_" );
	},
	links : function() {
		return Session.get('plot_links');
	},
	link : function() {
		return String(this);
	}
});