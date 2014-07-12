function getData( name, url, forward, backward, ttl ) {

		if( ttl == 0 )
			return;

		var param = { timeout : 32000 }

		console.log(name, ': ', url, TwitterDB.find().count());

		HTTP.get(url, param, function(ret, result) {
			if( result == null)
				return;

			_.each(result.data.results, function(d) {

				var s = Sentiment(d.item.message);
				TwitterDB.update( 
				{
					id : d.id 
				},
				{
					id : d.id,
					name     : name,
					// message : d.item.message,
					date       : new Date(d.tweet_creation_time),
					sentiment : s.comparative,
				}, 
				{
					upsert : true
				});
			});

			ttl = (isNaN(ttl) == true) ? ttl : ttl - 1;

			if( forward == true && _.isEmpty( result.data.next_url ) == false ) {
				getData( name, result.data.next_url, forward, backward, ttl );
			}

			if( backward == true && _.isEmpty( result.data.prev_url ) == false )
				getData( name,  result.data.prev_url, forward, backward, ttl ); 
		});
	}

	getPastData = function( name, url, ttl ) {
		getData( name, url, true, false, ttl );
	}