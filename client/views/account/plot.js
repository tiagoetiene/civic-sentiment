Template.PlotT.created =  function() {
}

Template.PlotT.helpers({
	plot : function() {
		return this.id;
	},
	links : function() {
		return Session.get('plot_links');
	},
	link : function() {
		return String(this);
	}
});