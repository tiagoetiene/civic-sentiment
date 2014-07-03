TwitterData = function() {
	var dict = {};
	var tweets = [];

	function manip() {
	}
	manip.add = function( obj ) {
		if(_.has(dict, obj.id) == true)
			return manip;

		dict[obj.id] = 1;
		tweets.splice( _.sortedIndex( tweets, obj.date ), 0, obj )
		return manip;
	}
	manip.all = function() {
		return tweets;
	}
	manip.data = function( start ) {
		return tweets.slice( _.sortedIndex( tweets, new Date( start ) ) );
	}
	return manip;
}
