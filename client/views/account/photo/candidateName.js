Template.CandidateNameT.helpers({
	name : function() {
		return this["person/name"] ;
	},
	color : function() {
		return "black";
	},
	tweets_count : function() {
		var tweetCount = reactiveTweetCount.get();
		return tweetCount[ this["person/name"] ] + ' ';
	}
});