Template.plot.plot = function() {
	return this.id;
}
Template.plot.created = function() {
	this.data.plot = Plot();
}
Template.plot.links = function() {
	return Session.get('plot_links');
}
Template.plot.link = function() {
	return String(this);
}