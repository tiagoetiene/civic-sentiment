TwitterCollection = new Meteor.Collection("tweets-summary")

if (Meteor.isClient) {
	var plot_colors = [];

	for(var i = 0; i < AllCandidates.length; ++i)
		AllCandidates[i].tweets_count = 0;

	var past = -31 * 24 * 60 * 60 * 1000;

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
				retrieveData();
			})

		$("#pastMonth").change( function(e)	{ past = -31 * 24 * 60 * 60 * 1000; retrieveData(); refreshingTime = 28800000; });
		$("#pastWeek").change( function(e)	{ past = - 7 * 24 * 60 * 60 * 1000; retrieveData(); refreshingTime = 3600000; });
		$("#pastDay").change( function(e)	{ past =     - 24 * 60 * 60 * 1000; retrieveData();	refreshingTime = 1800000;});
		$("#pastHour").change( function(e)	{ past =     -  8 * 60 * 60 * 1000; retrieveData(); refreshingTime = 300000;});
		$("#past5Min").change( function(e)	{ past =     -  1 * 60 * 60 * 1000; retrieveData(); refreshingTime = 60000;});
		$("#past1Min").change( function(e)	{ past =          -  5 * 60 * 1000; retrieveData(); refreshingTime = 2000;});
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

	Template.candidate_name.color = function() {
		return Session.get(this.name+':color');
	}

	Template.candidate_name.tweets_count = function() {
		Session.get(this.name);
		Session.set(this.name+':color', 'color:red');
		return this.tweets_count;
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
	var data = { };
  	  	
	function getIndex( interval ) {
		var idx;
		var depth = 18;
		var milliseconds = 1000;
		for(idx = 0; idx < 18; ++idx) {
			if(milliseconds >= interval)
				break;
			milliseconds *= 2;
		}
		return Math.min( depth - 1, idx );
	}

	function retrieveData() {
		var _now = new Date();
		var _past = getPast( _now, past );
		var bins = 200;
		var time_interval = Math.floor( Math.abs( past / bins ) );
		var depth = getIndex( time_interval );

		for(var i = 0; i < AllCandidates.length; ++i) {
			var found = false;
			for(var j = 0; j < SelectedCandidates.length; ++j)
				if(AllCandidates[i].name === SelectedCandidates[j].name)
					found = true
			if(found == false)
				data[AllCandidates[i].name] = undefined;
		}
		
		plot_colors = [];
		_.each(SelectedCandidates, function(candidate, idx) { 
			var query = { name : candidate.name, depth : depth };
			var r = TwitterCollection.findOne( query );
			var ret = _.filter(r.data, function(d) { 
				return +d.date >= +_past; 
			});
						
			SelectedCandidates[ idx ].tweets_count = 0;
			_.each(ret, function(d) {
				SelectedCandidates[ idx ].tweets_count += d.counter;
			})

			Session.set( candidate.name, SelectedCandidates[ idx ].tweets_count );
			setTimeout( function() {
				Session.set(candidate.name+':color', 'color:black');
			}, 3000);

			var max = d3.max( ret, function(d) { return Math.abs(d.sentiment) } );
			if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].sentiment /= max } );

			data[ candidate.name ] = [];
			data[ candidate.name ].push( ret );

			plot_colors.push( candidate.color );
		});
	}

	function pplot() {
		if(_.isEmpty(data))
			return;

		var plot_data = [];
		var _now = new Date();
		var _past = getPast( _now, past );
		var domain = [ _past, _now ];

		_.each(data, function(value, key) {
			if(value != undefined) {
				plot_data.push( value[0] );
			}
		});

		var plot_div = d3.select('#plot');
		plot_div.data( [ plot_data ] );
		plot.domain( [  _past , _now ]  )
					.x( function(d) { return d.date; } )
					.y( function(d) { return d.sentiment; } )
					.colors(plot_colors)
					(plot_div);
	}

	lastRefreshingTime = -1;
	retrievedDataId = undefined;
	refreshingTime  = undefined;
	retrieveData();
	pplot();
	setInterval(pplot, 1000);


	setInterval(function() {
		if(lastRefreshingTime != refreshingTime) {
			clearInterval(retrievedDataId);
			lastRefreshingTime = refreshingTime;
			console.log('current refreshing time: ', refreshingTime / 1000, 'seconds...');
			retrievedDataId = setInterval(retrieveData, refreshingTime);
		}
	}, 500);

	// Hack to fix image size. I've been trying to get the Wayin widget to be shaped as a perfect square
	// but I did not succeed. Thus, this hack will solve the problem.
    setInterval(function() { Session.set('UpdateImageHeight', !(Session.get('UpdateImageHeight') == true)); }, 1000);
}

if (Meteor.isServer) {	
	Meteor.startup(function () { 
	});
}
