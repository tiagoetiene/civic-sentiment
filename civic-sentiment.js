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

	updateAddressBar();

	function updatePlotScale() {

		var end = new Date( now() );
		var start = new Date( now() - 100 * Session.get( "CurrentInterval" ) );
		var domain = [ start, end ];

		if( _.isDate( start ) == false || _.isDate( end  == false) )
			return;

		_.each( reactiveUserSelectedNames.get() , function( name ) {
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
					var summaries = data[ name ].fetch();
					var tweetsCount = 0;
					_.each( summaries, function( summary ) { tweetsCount += summary.counter; } );
					Session.set( "tweets:" + name, tweetsCount );
					plot.domain( [ start , end ]  ).data( summaries ).update();
				}	
			}
		});
	}

	
	var intervalPlotHandler = Meteor.setInterval( function() { updatePlotScale(); }, 1000 );

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
				var histogramBins = 100; 
				var interval = Math.pow( 4, depth ) * 1000;
				var query = { 
					depth : depth, 
					twitter_handle : handle, 
					date : { 
						$gte : +(+(new Date())- histogramBins *  interval) 
					} 
				};
				var options = { fields : { "expire" : 0, } };
				var cursor = TwitterCollection.find( query, options );
				// console.log( "Query:", query, options );
				// console.log( "Count:", TwitterCollection.find( query, options ).count() );
				// console.log( "\n" );
	  		return cursor;
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

