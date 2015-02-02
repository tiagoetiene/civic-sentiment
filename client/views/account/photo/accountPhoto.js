Template.AccountPhotoT.helpers({
	twitter_page : function() {
		return "http://www.twitter.com/@" + this["person/twitterid"];
	}, 
	image : function() {
		var path = "photos/" + this["person/twitterid"].toLowerCase();
		return path;
	}
});