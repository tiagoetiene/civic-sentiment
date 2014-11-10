Template.CandidateNameT.helpers({
	color : function() {
		return "black";
	},
	tweets_count : function() {
		var tweetCount = reactiveTweetCount.get();
		return tweetCount[ this.name ] + ' ';
	}
});