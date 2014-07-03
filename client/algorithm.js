TwitterData = function( _candidate ) {

	var tweets = [];
	var candidate = _candidate;

	function manip() {
	}

	manip.add = function( obj ) {
		console.log('adding...');
		tweets.splice( _.sortedIndex( tweets, obj.date ), 0, obj )
		return manip;
	}

	manip.all = function() {
		return tweets;
	}

	manip.data = function( start ) {
		return tweets.slice( _.sortedIndex( tweets, new Data( start ) ) );
	}

	return manip;
}
