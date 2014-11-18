TwitterCollection = new Meteor.Collection("tweets-summary-test")
AccountsCollection = new Meteor.Collection("accounts");

if ( Meteor.isClient ) {

	ruler = Ruler();
	
	Meteor.subscribe("accounts");

	configInternationalization();

	document.title = i18n('title');

	timeUpdater("past month");

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
			// console.log( "\t* Updating interval to now! .... " );
		}
	}

	function updatePlotScale( ) {
		// console.log( "* Updating plot axis .... ")

		var startEnd = reactiveStartEndDates.get();
		var end = startEnd.end;
		var start = startEnd.start;
		var domain = [ start, end ];
		var plots = reactivePlots.get();
		var data = reactiveData.get( );

		if(_.isEmpty(startEnd))
			return;

		// console.log("\t* Plot parameters", startEnd);

		_.each( reactiveSelectedNames.get() , function( name ) {
			var plot = plots[ name ];
			if(plot !== undefined) {
				plot.x( function(d) { return d.date; } )
					.y( function(d) { return d.sentiment; } )
					.yPos( function(d) { return d.positive_sentiment; } )
					.yNeg( function(d) { return d.negative_sentiment; } )
					.onclick( function(d, sentiment) { 
						if(sentiment === 'pos')
							Session.set('plot_links', d.positive_url); 
						else
							Session.set('plot_links', d.negative_url); 
					})
					.onmouseover( function(x) { ruler.x( x ); })
					.onmouseout( function(x) { ruler.x( 0.0 ); });
				var div = d3.select( "#plot-"+ name.replace( / /, "_" ) );

				// We only create a plot iff the div has been created
				if( div[ 0 ][ 0 ] != null ) {
					plot( div );
					plot.domain( [  start , end ]  ).data( data[ name ] ).update();
				}
				
			}
		});
	}

	intervalPlotHandler = Meteor.setInterval( function() { updatePlotScale(); }, 5000 );
	intervalTimeHandler = Meteor.setInterval( function() { updateTimeInterval(); }, 5000);
	
	Router.map( function () {
		this.route('home', { path : '/' });
		this.route('howToSentimentPlot', { path : 'sentimentplot'} );
		this.route('howToSelect', {path : 'select'});
		this.route('howToSelectPolitician', {path : 'selectpolitician'});
		this.route( 'about' );
		this.route('AccountsT', { 
			loadingTemplate : "LoadingT",
			layoutTemplate : "CandidateSelectionT",
			path : 'realtime',
			waitOn : function() {
				console.log("* Wating on data...");
				var names;

				// I. Processing URL parameters. We expect two parameters: selected candidates and timeframe
				// The parsed parameters  will be stored into the reactive vars
				if(this.params.query.politicians) {
					names = _.filter( this.params.query.politicians.split(','), 
						function(name) { return _.isEmpty(name) == false; });
					reactiveSelectedNames.set( names );
				}

				// If no candidades are selected, we do a housekeeping and 
				// return ....
				if( names == undefined  ) {
					reactiveSelectedNames.set( [] );
					return;
				}

				if( this.params.query.timeframe ) {
					timeUpdater( this.params.query.timeframe );
				}

				// ... otherwise, it is time to shine. We will retrieve the data
				// and will wait until everything is loaded before continue
				// Here we heaviy rely on Meteor folks to do some caching
				console.log("\t* Retrieving data for", names);
				return Meteor.subscribe( "summaries", names );
			},
			onAfterAction : function() {
				var plots = {};
				_.each( reactiveSelectedNames.get(), function( name ) {
					plots[ name ] = Plot();
				});
				reactivePlots.set( plots );
				console.log("\t* All right, the data was successfully loaded.")
			}
		});
	});
};

if (Meteor.isServer) { 
	Meteor.startup(function () { }); 
	Meteor.publish("summaries", function ( names ) {
		query = { name : { $in : names } };
  		return TwitterCollection.find( query );
	});
	Meteor.publish("accounts", function() {
		return AccountsCollection.find( { } );
	});
}

