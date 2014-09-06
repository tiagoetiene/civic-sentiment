Template.language.events( {
	'click' : function(event) {
		document.title =i18n('title');
		if( i18n.getLanguage() === 'pt-br' )
			i18n.setLanguage('en-us');
		else
			i18n.setLanguage('pt-br');
		Session.set( 'updateSelect', Session.get('updateSelect') !== true );
	}
});