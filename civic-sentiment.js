TwitterDB = new Meteor.Collection("tweets")

function setCandidateCursors(past) {
	_.each(AllCandidates, function( _ , idx ) {
    		var query_param = { date : { $gt : past },  name : AllCandidates[idx].name };
    		AllCandidates[idx].cursor = TwitterDB.find(query_param);
  	});
}

function setCandidateTwitterData() {
	_.each(AllCandidates, function( _ , idx ) {
		AllCandidates[idx].tweets = TwitterData(  );
	});
}

if (Meteor.isClient) {
	var past = -7 * 24 * 60 * 60 * 1000;

	$(document).ready(function() { 
		$("#e1").select2({placeholder: "Select a politician"})
			.on("change", function(e) {
			var found = false; 
			for(var i = 0; i < SelectedCandidates.length; ++i)
				if(e.val.indexOf(SelectedCandidates[i].name) != -1)
					found = true;
			if(found == true)
				return
			for(var i = 0; i < AllCandidates.length; ++i)
				if(e.val.indexOf(AllCandidates[i].name) != -1) {
					SelectedCandidates.push(AllCandidates[i]);
					Session.set('ListOfCandidates', !(Session.get('ListOfCandidates') == true) );
					return
				}
			})

		$("#pastWeek").change( function(e){ past = -7 * 24 * 60 * 60 * 1000; })
		$("#pastDay").change( function(e)	{ past =      - 24 * 60 * 60 * 1000; })
		$("#pastHour").change( function(e)	{ past =          - 1 * 60 * 60 * 1000; })
		$("#past5Min").change( function(e)	{ past =                 -  5 * 60 * 1000; })
		$("#past1Min").change( function(e)	{ past =                      -  60 * 1000; })
  	});
  
	Template.twitter_feed.iframe_source = function() {
		return this.iframe_src;
	}

	Template.twitter_feed.iframe_id = function() {
		return this.iframe_id;
	}

	Template.candidate_name.name = function() {
		return this.name;
	}

	Template.main.list_of_candidates = function() {
		Session.get('ListOfCandidates')
		return SelectedCandidates;
	}

	Template.close_button.events =  {
		'click h5': function (event) {
			var _this = this;
			SelectedCandidates = _.filter(SelectedCandidates, function(data) {
					return data.iframe_id.localeCompare(_this.iframe_id) != 0;
      				});

			// Updating WAYIN data
			window.WAYIN.hubs = _.filter(window.WAYIN.hubs, function(hub) {
				return hub.hub_iframe.id.localeCompare(_this.iframe_id) != 0;
      			})
			Session.set('ListOfCandidates', !(Session.get('ListOfCandidates') == true) );
		}
	}

	Template.candidate_image.candidate_image = function() {
		return this.image;
	}

	Template.candidate_image.image_height = function() {
		Session.get('UpdateImageHeight');
		var height = $('#'+this.iframe_id).height();
		if(height == null)
	  		return '268px';
		return height + 'px';
	}

	var plot = Plot();
  	  	
  	setCandidateCursors(getPast(new Date(), past));
  	setCandidateTwitterData();

  	_.each(AllCandidates, function( _ , idx) {
  		AllCandidates[idx].cursor.observeChanges( {
			added : function(id, obj) {
	  			AllCandidates[idx].tweets.add( obj ); 
	  		}
	  	});
  	});

	function plotData() {
		var data = [];
		var _now = new Date();
		var _past = getPast( _now, past );
		var domain = [ _past, _now ];
		var bins = 30;
	  
		_.each(SelectedCandidates, function(candidate) { 
			var datum = candidate.tweets.data( _past );
		  
			// BUILDING HISTOGRAM
			var time_interval = Math.abs( past / 1000 );
			var bins = 30;

			while(time_interval % bins != 0)
				bins++;

			var delta  = time_interval / bins; 
			var interval_size = delta * 1000;
			var interval_start = new Date( _past );

			interval_start.setDate( interval_start.getDate() - 7 );
			interval_start.setHours( 0 );
			interval_start.setMinutes( 0 );
			interval_start.setSeconds( 0 );
			interval_start.setMilliseconds( 0 );

			var ref_idx = Math.floor( (_past.valueOf() - interval_start.valueOf()) / interval_size );

			var histogram = [];
			for(var i = 0; i < bins ; ++i)
				histogram.push({  
					x : new Date(  interval_start.valueOf() + (i + ref_idx) * interval_size ), 
					sentiment : 0.0 
				});

			_.each(datum, function(d) {
				var idx = Math.floor( (d.date.valueOf() - interval_start.valueOf()) / interval_size );
				idx -= ref_idx;
				if(idx >= 0 && idx < histogram.length)
					histogram[idx].sentiment += d.sentiment;
			});

			var max = d3.max( histogram, function(d) { return Math.abs(d.sentiment); } );
			if(max != 0) _.each(histogram, function(d, idx) { histogram[idx].sentiment /= max } );
			data.push( histogram );
		});
	      
		var plot_div = d3.select('#plot');
		plot_div.data( [ data ] );
		plot.domain( [  _past , _now ]  )
			.x( function(d) { return d.x; } )
			.y( function(d) { return d.sentiment; } )
			(plot_div);
	}

	setInterval(plotData, 1000);

	// Hack to fix image size. I've been trying to get the Wayin widget to be shaped as a perfect square
	// but I did not succeed. Thus, this hack will solve the problem.
    	setInterval(function() { Session.set('UpdateImageHeight', !(Session.get('UpdateImageHeight') == true)); }, 1000);
}

if (Meteor.isServer) {
    // TwitterDB.remove({});
    Sentiment = Npm.require("sentiment");

    console.log("Total number of entries: ", TwitterDB.find().count());

    // TwitterDB._ensureIndex( { id : 1}, { unique : true } );
    // TwitterDB._ensureIndex( { date : 1 , name : 1 } );
    function getData( name, url, forward, backward ) {
        var param = { timeout : 32000 }

        // console.log(name, ': ', url);

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
                        id           : d.id,
                        name     : name,
                        // message : d.item.message,
                        date       : new Date(d.tweet_creation_time),
                        sentiment : s.comparative,
                    }, 
                    {
                        upsert:true
                    });
            });

            if( forward == true && _.isEmpty( result.data.next_url ) == false )
                getData( name, result.data.next_url );

            if( backward == true && _.isEmpty( result.data.prev_url ) == false )
                getData( name,  result.data.prev_url );
        });
    }

    Meteor.startup(function () { 
        _.each(AllCandidates, function( candidate ) {
            getData( candidate.name, candidate.url_feed, true, true );
        });

        Meteor.setInterval( function() {
            _.each(AllCandidates, function( candidate ) {
              getData( candidate.name, candidate.url_feed, true, false );
            });
        }, 1000 );
    });
}
