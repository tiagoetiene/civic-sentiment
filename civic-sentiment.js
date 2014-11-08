TwitterCollection = new Meteor.Collection("tweets-summary-test")
AccountsCollection = new Meteor.Collection("accounts");

if ( Meteor.isClient ) {

	ruler = Ruler();
	
	Meteor.subscribe("accounts");

	configInternationalization();
	document.title =i18n('title');

	Template.Ruler.rendered = function() {
		ruler(d3.select('#ruler'));
	}

	Template.appHome.rendered = function() {
		comboboxObserver();		
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
  	  	
	function wwww( ) {

		console.log( "verifyig if there is data available .... ")


		// var past = getTimeFrame();
		// var plot_data = [];
		// var _now = new Date();
		// var _past = getPast( _now, past );
		// var domain = [ _past, _now ];
		// var selected = reactiveSelectedArray.get();

		// _.each( selected , function( d ) {
		// 	if(d.plot !== undefined) {
		// 		d.plot
		// 			.x( function(d) { return d.date; } )
		// 			.y( function(d) { return d.sentiment; } )
		// 			.yPos( function(d) { return d.positive_sentiment; } )
		// 			.yNeg( function(d) { return d.negative_sentiment; } )
		// 			.onclick( function(d, sentiment) { 
		// 				if(sentiment === 'pos')
		// 					Session.set('plot_links', d.positive_url); 
		// 				else
		// 					Session.set('plot_links', d.negative_url); 
		// 			})
		// 			.onmouseover( function(x) { ruler.x( x ); })
		// 			.onmouseout( function(x) { ruler.x( 0.0 ); })
		// 			(d3.select( "#"+ d.id ))
		// 	}
		// });
		// _.each(selected, function(politician) {
		// 	if(politician.plot !== undefined) {
		// 		politician.plot.domain( [  _past , _now ]  ).data( politician.data ).update();
		// 	}
		// });
	}

	// Meteor.setInterval( function() { wwww(); }, 1000 );
	
	


	Router.map( function () {
		this.route('home', { path : '/' });
		this.route('howToSentimentPlot', { path : 'sentimentplot'} );
		this.route('howToSelect', {path : 'select'});
		this.route('howToSelectPolitician', {path : 'selectpolitician'});
		this.route( 'about' );
		this.route('appHome', { 
			path : 'realtime',
			waitOn : function() {
				console.log("* Wating on data...");

				var names;
				var depth;
				var interval;
				var startDate;
				var endDate;

				if(this.params.query.politicians) {
					names = _.filter( this.params.query.politicians.split(','), function(name) { return _.isEmpty(name) == false; });
					reactiveSelectedNames.set( names );
				}
				if(this.params.query.timeframe) {
					var timeframe = getTimeFrame( this.params.query.timeframe );
					endDate = new Date();
					startDate = new Date( +endDate + timeframe )				
				}

				var exactInterval = (+endDate - (+startDate)) / HistogramBins;
				var depthIntervalPair = findDepthAndInterval( exactInterval );
				depth = depthIntervalPair.depth;
				interval = depthIntervalPair.interval;

				reactiveStartEndDates.set( 
					{ 
						start : startDate, 
						end : endDate, 
						depth : depth,
						interval : interval
					});

				console.log("\t* Retrieving data for", names, "at depth", depth);
				return Meteor.subscribe( "summaries", names, depth );
			},
			onAfterAction : function() {
				console.log("\t* All right, the data was successfully loaded.")
			}
		});
	});
};

if (Meteor.isServer) { 
	Meteor.startup(function () { }); 
	Meteor.publish("summaries", function ( names, depth ) {
		query = { name : { $in : names }, depth : depth };
  		return TwitterCollection.find( query );
	});
	Meteor.publish("accounts", function() {
		return AccountsCollection.find( { } );
	});
}

