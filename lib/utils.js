now = function() { return +( new Date() ); }

contains = function( list, value ) { 
	for( var i = 0; i < list.length; ++i ) {
		if( _.isEqual( list[ i ], value ) == true ) {
			return true;
		}
	}
	return false;
}

twitterIdKey = function( name ) {
	return name.toLowerCase();
}