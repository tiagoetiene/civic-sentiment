Template.PlotT.created =  function() {
}

Template.PlotT.helpers({
	plot : function() {
		var name = this["person/name"]
		return "plot-" + name.replace( / /g, "_" ).replace( /\./g, "_" ).replace( /\[/g, "_" ).replace( /\]/g, "_" );
	},
	links : function() {
		return Session.get('plot_links');
	},
	link : function() {
		return String(this);
	}
});