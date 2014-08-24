Template.plot.plot = function() {
	if(this.plot === undefined)  this.plot = Plot();
	return this.id;
}
Template.plot.links = function() {
	return Session.get('plot_links');
}
Template.plot.link = function() {
	return String(this);
}