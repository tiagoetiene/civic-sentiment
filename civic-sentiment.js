TwitterDB = new Meteor.Collection("tweets")

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
  	  	
	function plotData() {
		var data = [];
		var _now = new Date();
		var _past = getPast( _now, past );
		var domain = [ _past, _now ];
		var bins = 30;
		var time_interval = Math.floor( Math.abs( past / bins ) );

		_.each(SelectedCandidates, function(candidate) { 
			Meteor.call('data', candidate.name, time_interval, _past, function(error, ret) {
				
				var max = d3.max( ret, function(d) { return Math.abs(d.sentiment) } );
				if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].sentiment /= max } );
				
				data.push( ret );

				var plot_div = d3.select('#plot');
				plot_div.data( [ data ] );
				plot.domain( [  _past , _now ]  )
					.x( function(d) { return d.date; } )
					.y( function(d) { return d.sentiment; } )
					(plot_div);
			});
		});
	}

	setInterval(plotData, 1000);

	// Hack to fix image size. I've been trying to get the Wayin widget to be shaped as a perfect square
	// but I did not succeed. Thus, this hack will solve the problem.
    	setInterval(function() { Session.set('UpdateImageHeight', !(Session.get('UpdateImageHeight') == true)); }, 1000);
}

if (Meteor.isServer) {

	Sentiment = Meteor.require("sentiment");
	var CandidateTree = {};

	// TwitterDB.remove({});
	// TwitterDB._ensureIndex( { id : 1}, { unique : true } );
	// TwitterDB._ensureIndex( { date : 1 , name : 1 } );
	
	Meteor.startup(function () { 

		console.log( 'Setting search tree... ' );
		_.each( AllCandidates, function( _ , idx) {
			CandidateTree[ _.name ] = TimeTree();
			CandidateTree[ _.name ]
								 .depth( 24 )
								 .dateValuer( function( d ) { return d.date; } )
								 .sentimentValuer( function( d ) { return d.sentiment; } );
		}); 


		console.log( 'Setting database observers... ' );
		_.each(AllCandidates, function( _ , idx) {
			var name = _.name;
			var query_param = { name : name };
    			AllCandidates[ idx ].cursor = TwitterDB.find( query_param );
			AllCandidates[ idx ].cursor.observeChanges( {
				added : function(id, obj) {
					CandidateTree[ name ].add( obj ); 
	  			}
	  		});
  		});

		console.log( 'Setting feedback methods... ' );
		Meteor.methods({
			data : function( name, interval, past ) {
				if( _.has( CandidateTree, name ) )
					return CandidateTree[ name ].get( interval, past );
				return [];
            	},
            });

		console.log( 'Getting past data... ' );
		_.each( AllCandidates, function( candidate ) {
			getPastData( candidate.name, candidate.url_feed );
		});

		Meteor.setInterval( function() {
			_.each( AllCandidates, function( candidate ) {
				var ttl = 3;
				getPastData( candidate.name, candidate.url_feed, ttl );
			});  
		}, 1000);

		console.log( 'Server has started... ' );
	});
}
