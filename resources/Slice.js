Slice = function( name ) {

	var db = new Meteor.Collection( name );
	db.remove( {} );

	var interval;
	
	function slice() {}

	slice.datum = function( _ ) {
		var date = new Date( _.tweet_creation_time );
		var npos = Math.floor( +date / interval );
		var ddd = interval * npos;
		console.assert( isNaN(npos) == false );

		var query = { key : npos, name : _.name,  date : new Date(ddd) };
		var update = { $inc: { score: 1 } };
		var options = { upsert : true };

		db.find().forEach( function(d) { console.log(d) });

		db.update( query, update, options );
		return slice;
	}

	slice.interval = function( _ ) {
		if( !arguments.length )
			return interval;
		interval = _;
		return slice;
	}

	slice.find = function( _ ) {
		return db.find( _ );
	}

	return slice;
}