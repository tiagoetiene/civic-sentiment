TwitterCollection = new Meteor.Collection("tweets-summary")
Politicians = People();

if ( Meteor.isClient ) {

	ruler = Ruler();
	Meteor.subscribe("summaries");
	configInternationalization();
	document.title =i18n('title');

	$(document).ready(function() {
	});

	Template.Ruler.rendered = function() {
		ruler(d3.select('#ruler'));
	}

	Template.candidateInfo.background_image = function() {
		return "background-image:url(" + this.image + ")";
	}

  	Template.twitter_feed.rendered = function() {
		if (!window.WAYIN) {
			window.WAYIN = {hubs: []};}
			window.WAYIN.hubs.push(
				{
					hub_iframe: document.getElementById(this.data.iframe_id),
					not_use_outer_iframe:false,
					vexpand:false,
					allows_dialogs:true,
					updates_url:false
				});
			(function() {
				if (document.getElementById('wayin-hub-embedd-script')) {
					return;
				} else {
					var script = document.createElement('script');
					script.id = 'wayin-hub-embedd-script';
					script.type = 'text/javascript';
					script.src = '//rjihacks.wayinhub.com/scripts/iframe-onload.js';
					document.body.appendChild( script );
				}
			})();
  	}

	Template.appHome.rendered = function() {
		comboboxObserver();		
	}

	Template.home.coverImage =function() {
		return 'background : url(' + i18n('images.coverImage') + ') no-repeat; background-size:cover;';
	}

	Template.jumbotron.background_image = function() {
		return i18n('images.backgroundImage');
	}

	Template.candidate_name.color = function() {
		return Session.get(this.name+':color');
	}

	Template.candidate_name.tweets_count = function() {
		Session.get(this.name);
		Session.set(this.name+':color', 'color:red');
		if(this.tweets_count === undefined)
			return i18n('Loading');
		return this.tweets_count + ' ';
	}

	Template.main.list_of_candidates = function() {
		urlParamSelected.get();
		return Politicians.selected();
	}

	Template.main.isCandidateVisible = function() {
		return (Politicians.visible( this.name )) ? "" : "hidden";
	}

	Template.main.isVisible = function() {
		return Politicians.visible( this.name );
	}
  	  	
	function pplot(  name ) {
		if(_.isEmpty(data))
			return;

		var past = getTimeFrame();
		var plot_data = [];
		var _now = new Date();
		var _past = getPast( _now, past );
		var domain = [ _past, _now ];

		_.each( Politicians.selected(), function( d ) {
			if(d.plot !== undefined) {
				d.plot
					.x( function(d) { return d.date; } )
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
					.onmouseout( function(x) { ruler.x( 0.0 ); })
					(d3.select( "#"+ d.id ))
			}
		});
		_.each(Politicians.selected(), function(politician) {
			if(politician.plot !== undefined) {
				politician.plot.domain( [  _past , _now ]  ).data( politician.data ).update();
			}
		});
	}

	setInterval(pplot, 1000);
	Router.map( function () {
	this.route('home', { path : '/' });
	this.route('howToSentimentPlot', { path : 'sentimentplot'} );
	this.route('howToSelect', {path : 'select'});
	this.route('howToSelectPolitician', {path : 'selectpolitician'});
	this.route( 'about' );
	this.route('appHome', { 
		path : 'realtime',
		data : function() {
			if(this.params.politicians)
				urlParamSelected.set(this.params.politicians.split(','));
			if(this.params.timeframe)
				urlParamTimeframe.set(this.params.timeframe);
		}
	});
});
};

if (Meteor.isServer) { 
	Meteor.startup(function () { }); 
	Meteor.publish("summaries", function () {
  		return TwitterCollection.find( {} );
	});
}

