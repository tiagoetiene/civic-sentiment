Template.PlotT.created =  function() {
}

Template.PlotT.helpers({
	plot : function() {
		return "plot-" + this.name.replace( / /g, "_" ).replace( /\./g, "_" );
	},
	links : function() {
		return Session.get('plot_links');
	},
	link : function() {
		return String(this);
	}
});