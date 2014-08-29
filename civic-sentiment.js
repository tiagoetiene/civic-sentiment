TwitterCollection = new Meteor.Collection("tweets-summary")
Politicians = People();

if ( Meteor.isClient ) {
	Session.set('IsCoverPage', true);
	Meteor.loginVisitor()
	
	configInternationalization();
	document.title =i18n('title');
	var past = -31 * 24 * 60 * 60 * 1000;

	$(document).ready(function() {
		function animateLinkTag( selection ) {
			selection.click(function(){  
				$('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top }, 500); return false; 
			});
		}

		animateLinkTag( $('#linkTo0') );
		animateLinkTag( $('#linkTo1') );
		animateLinkTag( $('#aboutLink') );

		$('#language').click(function(){
			if( i18n.getLanguage() === 'pt-br' )
				i18n.setLanguage('en-us');
			else
				i18n.setLanguage('pt-br');
			Session.set( 'updateSelect', Session.get('updateSelect') !== true );
		})
  	});

	Template.getStartedButton.rendered = function() {
		d3.selectAll('#xxxx')
			.each(function() {
				$(this).click( function() { Session.set('IsCoverPage', Session.get('IsCoverPage') !== true); });
			});
		
	}

	Template.mainPage.rendered = function() {
		$("#e1").selectpicker('refresh').selectpicker('render');
		$("#e1").select({placeholder: i18n("selectPolitician")})
			.on("change", function(e) {
				var selected = e.target
				for(var i = 0; i < Politicians.size(); ++i)
					Politicians( i ).selected = selected[i + 1].selected;
				Session.set('ListOfCandidates', !(Session.get('ListOfCandidates') == true) );
				retrieveData();
			});
		$("#pastMonth").change( function(e)	{ past = -31 * 24 * 60 * 60 * 1000; retrieveData(); refreshingTime = 28800000; });
		$("#pastWeek").change( function(e)	{ past = - 7 * 24 * 60 * 60 * 1000; retrieveData(); refreshingTime = 3600000; });
		$("#past3Day").change( function(e)		{ past = - 3 * 24 * 60 * 60 * 1000; retrieveData(); refreshingTime = 6000000; });
		$("#pastDay").change( function(e)		{ past =      - 24 * 60 * 60 * 1000; retrieveData(); refreshingTime = 1800000; });
		$("#past8Hour").change( function(e)	{ past =     -  8 * 60 * 60 * 1000; retrieveData(); refreshingTime = 300000; });
		$("#past1Hour").change( function(e)	{ past =     -  1 * 60 * 60 * 1000; retrieveData(); refreshingTime = 60000; });
		$("#past5Min").change( function(e)		{ past =          -  5 * 60 * 1000; retrieveData(); refreshingTime = 2000; });
	}

	Template.bodyTemplate.coverImage =function() {
		if(Session.get('IsCoverPage') === true)
			return 'background : url(' + i18n('coverImage') + ');';
		return ' ';
	}

	Template.bodyTemplate.coverPage = function() {
		return Session.get('IsCoverPage');
	}

	Template.jumbotron.background_image = function() {
		return i18n('backgroundImage');
	}

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
		if(this.tweets_count === undefined)
			return i18n('Loading');
		return this.tweets_count + ' ';
	}

	Template.main.list_of_candidates = function() {
		Session.get('ListOfCandidates')
		return Politicians();
	}

	Template.main.isCandidateVisible = function( a, b ) {
		return (Politicians.visible( this.name )) ? "" : "hidden";
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
      		});
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
		return { depth : Math.min( depth - 1, idx ), interval : milliseconds };
	}

	function retrieveData() {
		var _now = new Date();
		var _past = getPast( _now, past );
		var bins = 100;
		var time_interval = Math.floor( Math.abs( past / bins ) );
		var pair = getIndex( time_interval );

		for(var i = 0; i < Politicians.size(); ++i)
			if(Politicians( i ).selected !== true)
				data[ Politicians( i ).name ] = undefined;
		
		_.each( Politicians(), function(candidate, idx) { 
			if(candidate.selected === true) {
				var query = { name : candidate.name, depth : pair.depth };
				var r = TwitterCollection.findOne( query );
				if(r !== undefined) {
					var ret = _.filter(r.data, function(d) {  return +d.date >= +_past; });
								
					Politicians( idx ).tweets_count = 0;
					_.each(ret, function(d) { Politicians( idx ).tweets_count += d.counter; });

					Session.set( candidate.name, Politicians( idx ).tweets_count );
					setTimeout( function() { Session.set(candidate.name+':color', 'color:black'); }, 3000);

					var max = d3.max( ret, function(d) { return d.positive_sentiment } );
					max = Math.max(max, d3.max( ret, function(d) { return Math.abs(d.negative_sentiment)} ));
					if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].positive_sentiment /= max } );
					if( max != 0 ) _.each( ret, function(d, idx) { ret[ idx ].negative_sentiment /= max } );

					Politicians( idx ).data = ret;
				}
			}
		});
	}

	function pplot(  name ) {
		if(_.isEmpty(data))
			return;

		var plot_data = [];
		var _now = new Date();
		var _past = getPast( _now, past );
		var domain = [ _past, _now ];

		_.each( Politicians.selected(), function( d ) {
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
				(d3.select( "#"+ d.id ))
		});
		_.each(Politicians.selected(), function(politician) {
			politician.plot.domain( [  _past , _now ]  ).data( politician.data ).update();
		});
	}

	lastRefreshingTime = -1;
	retrievedDataId = undefined;
	refreshingTime  = 10000;
	retrieveData();
	setInterval(pplot, 1000);

	setInterval(function() {
		if(lastRefreshingTime != refreshingTime) {
			clearInterval(retrievedDataId);
			lastRefreshingTime = refreshingTime;
			console.log('current refreshing time: ', refreshingTime / 1000, 'seconds...');
			retrievedDataId = setInterval(retrieveData, refreshingTime);
		}
	}, 500);
};

if (Meteor.isServer) { Meteor.startup(function () { }); }

