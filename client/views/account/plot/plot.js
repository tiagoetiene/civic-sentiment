Template.PlotT.created =  function() {
}

Template.PlotT.helpers({
	plot : function() {
		return "plot-" + this.name.replace( / /, "_" );
	},
	links : function() {
		return Session.get('plot_links');
	},
	link : function() {
		return String(this);
	}
});