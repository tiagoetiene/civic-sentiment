Template.select.group = function(){
	Session.get('updateSelect');
	$("#e1").selectpicker('render').selectpicker('refresh');
	return Politicians.types();
}

Template.select.label = function() {
	Session.get('updateSelect');
	return i18n('options.'+String(this));
}

Template.select.listOfPoliticians = function() {
	Session.get('updateSelect');
	return Politicians.selectByType( String( this ) );
}

Template.select.searchVisibility = function() {
	Session.get('ListOfCandidates');
	return (Politicians.hasSelected()) ? "visible" : "hidden";
}