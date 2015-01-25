TwitterCollection = new Meteor.Collection("summary")
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
		// if( reactiveNow.get() === true ) {
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
		// }
	}

	function updatePlotScale() {
		var startEnd = reactiveStartEndDates.get();
		var end = startEnd.end;
		var start = startEnd.start;
		var domain = [ start, end ];
		var plots = reactivePlots.get();

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

	var lastDepth = -1;
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
						if( _.has( NameToTwitterID, name ) ) {
							twitterHandlers.push( NameToTwitterID[ name ] );
						}
				} );

				console.assert( _.isUndefined( startEnd.depth ) == false );
				console.assert( _.isUndefined( startEnd.interval ) == false );

				Session.set( "CurrentDepth", startEnd.depth );
				Session.set( "CurrentInterval", startEnd.interval );

				if( startEnd.depth != lastDepth ) {

					lastDepth = startEnd.depth;

				} else {

					//
					// We will subscribe only to the handlers that we have not yet
					// subscribed to
					//
					twitterHandlers = _.filter( twitterHandlers, function( handle ) {
						return Session.equals( "sub:" + handle, undefined );
					} );

				}

				_.each( twitterHandlers, function( handle ) {
					var subscriptionHandler = Meteor.subscribe( "summary:" + handle, startEnd.depth );
					Session.set( "sub:" + handle, subscriptionHandler );
					Tracker.autorun( function() { Session.set( "sub:ready:" + handle, subscriptionHandler.ready() ); })
				} );

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

	var options = { limit : 600, fields : {  "person/twitterid" : true,  } };
	var politicians = AccountsCollection.find( { }, options ).fetch();

	_.each( politicians, function( politician ) {

		//
		// Twitter identifier
		//
		var handle = "@" + politician["person/twitterid"].toLowerCase();

		//
		// Publishing the date for each politician 
		// subscription identification: "summary:@twitter_handle"
		//
		Meteor.publish("summary:" + handle, function ( depth ) {
				var query = { depth : depth , twitter_handle : handle };
				var options = { fields : { "expire" : 0, } };
	  		return TwitterCollection.find( query, options );
			} );
	} );

	

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

