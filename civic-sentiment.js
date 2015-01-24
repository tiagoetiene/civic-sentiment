TwitterCollection = new Meteor.Collection("tweets-summary-test")
AccountsCollection = new Meteor.Collection("politicians");

reactiveSubscriptionHandle = new ReactiveVar(undefined, _.isEqual);

if ( Meteor.isClient ) {

	ruler = Ruler();

	configInternationalization();

	document.title = i18n('title');

	Template.Ruler.rendered = function() {
		ruler(d3.select('#ruler'));
	}

	Template.home.helpers({
		coverImage : function() {
			return 'background : url(' + i18n('images.coverImage') + ') no-repeat; background-size:cover;';
		}
	});

	Template.jumbotron.helpers({
		background_image : function() {
			return i18n('images.backgroundImage');
		}
	});

	function updateTimeInterval( ) {
		if( reactiveNow.get() === true ) {
			var startEnd = reactiveStartEndDates.get();
			var end = new Date();
			var diff = +startEnd.end - (+startEnd.start);
			var start = new Date( +end - diff );
			var tmp = {
				start : start,
				end : end,
				depth : startEnd.depth,
				interval : startEnd.interval
			};
			reactiveStartEndDates.set( tmp );
		}
	}

	function updatePlotScale() {
		var startEnd = reactiveStartEndDates.get();
		var end = startEnd.end;
		var start = startEnd.start;
		var domain = [ start, end ];
		var plots = reactivePlots.get();
		var data = reactiveData.get();

		if(_.isEmpty(startEnd))
			return;

		_.each( reactiveSelectedNames.get() , function( name ) {
			var plot = plots[ name ];
			if(plot !== undefined) {
				plot
					.x( function(d) { return d.date; } )
					.y( function(d) { return d.sentiment; } )
					.yPos( function(d) { return d.sentiment; } )
					.yNeg( function(d) { return d.sentiment; } )
					.onclick( function( d, sentiment ) { 
						// if(sentiment === 'pos')
						// 	Session.set('plot_links', d.positive_url); 
						// else
						// 	Session.set('plot_links', d.negative_url); 
					})
					.onmouseover( function( x ) { ruler.x( x ); } )
					.onmouseout( function( x ) { ruler.x( 0.0 ); } );
				var div = d3
					.select( "#plot-"+ name
					.replace( / /g, "_" )
					.replace( /\./g, "_" )
					.replace( /\[/g, "_" )
					.replace( /\]/g, "_" ) );

				// We only create a plot iff the div has been created
				if( div[ 0 ][ 0 ] != null ) {
					plot( div );
					plot.domain( [  start , end ]  ).data( data[ name ] ).update();
				}	
			}
		});
	}

	var intervalPlotHandler, intervalTimeHandler, interval;
	Tracker.autorun( function() {
		var startEnd = reactiveStartEndDates.get();

		if(interval == startEnd.interval) 
			return;

		interval = startEnd.interval;

		clearInterval( intervalTimeHandler );
		clearInterval( intervalPlotHandler );

		intervalPlotHandler = Meteor.setInterval( function() { updatePlotScale(); }, 1000 );
		intervalTimeHandler = Meteor.setInterval( function() { updateTimeInterval(); }, 1000 );
	});

	Router.map( function () {
		this.route('home', { 
			path : '/',
			waitOn : function() {
				return Meteor.subscribe( "accounts" );
			},
		});
		this.route('howToSentimentPlot', { path : 'sentimentplot'} );
		this.route('howToSelect', {path : 'select'});
		this.route('howToSelectPolitician', {path : 'selectpolitician'});
		this.route( 'about' );
		this.route('AccountsT', { 
			layoutTemplate : "CandidateSelectionT",
			path : 'realtime',
			waitOn : function() {
				return Meteor.subscribe( "accounts" );
			},
			data : function() {
				var names;
				var startEnd;

				// I. Processing URL parameters. We expect two parameters: selected candidates and timeframe
				// The parsed parameters  will be stored into the reactive vars
				if(this.params.query.p) {
					names = _.filter( this.params.query.p.split(','), function(name) { 
						return _.isEmpty(name) == false; 
					} );
					reactiveSelectedNames.set( names );
				}

				// If no candidades are selected, we do a housekeeping and 
				// return ....
				if( names == undefined  ) {
					reactiveSelectedNames.set( [] );
				}

				if( this.params.query.t ) {
					startEnd = timeUpdater( this.params.query.t );
					reactiveUserSelectedTimeframe.set( this.params.query.t );
				}
				else {
					reactiveUserSelectedTimeframe.set("past month");
					return;
				}

				if( names == undefined )
					return;

				var twitterHandlers = [];
				_.each( names, function( name ) {
					twitterHandlers.push( NameToTwitterID[ name ] );
				} );

				var handle = Meteor.subscribe( "summaries", twitterHandlers, startEnd.depth );
				reactiveSubscriptionHandle.set( handle );

				var plots = {};
				_.each( reactiveSelectedNames.get(), function( name ) { 
					plots[ name ] = Plot(); 
				});

				reactivePlots.set( plots );
			}
		});
	});
};

if (Meteor.isServer) { 
	Meteor.startup(function () { }); 
	Meteor.publish("summaries", function ( handles, depth ) {
			var query = { depth : depth , twitter_handle : { $in : handles } };
			var options = {
				fields : {
					// "_id" : 0,
					// "date" : true,
					// "depth" : true,
					// "twitter_handle" : true,
					// "counter" : 0,
					// "sentiment" : 0,
					"expire" : 0,
				}
			}
  		return TwitterCollection.find( query, options );
	});
	Meteor.publish("accounts", function() {
		var options = { 
				limit : 600, fields : { 
				"person/name" : true, 
				"person/twitterid" : true, 
				"state" : true, 
			}
		};
		return AccountsCollection.find( { }, options );
	});
}

