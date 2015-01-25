Template.CandidateNameT.helpers({
	name : function() {
		return this["person/name"] ;
	},
	color : function() {
		return "black";
	},
	tweets_count : function() {
		return Session.get( "tweets:" + this["person/name"] ) + ' ';
	}
});