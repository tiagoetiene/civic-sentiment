Template.CandidateNameT.helpers({
	color : function() {
		return Session.get(this.name+':color');
	},
	tweets_count : function() {
		Session.get(this.name);
		Session.set(this.name+':color', 'color:red');
		if(this.tweets_count === undefined)
			return i18n('Loading');
		return this.tweets_count + ' ';
	}
});