reactiveUserSelectedNames = new ReactiveVar([], _.isEqual);
reactiveUserSelectedTimeframe = new ReactiveVar("past month", _.isEqual);

reactiveRoutePath = new ReactiveVar("/realtime", _.isEqual);

reactiveSelectedNames = new ReactiveVar( [], _.isEqual );
reactiveStartEndDates = new ReactiveVar( {}, _.isEqual );
reactiveNow = new ReactiveVar( false, _.isEqual );

reactiveData = new ReactiveVar( {}, _.isEqual );
reactivePlots = new ReactiveVar( {}, _.isEqual );
reactiveTweetCount = new ReactiveVar( {}, _.isEqual );

var firstTime = true;
var previousPath = "";
function updateRoute() {
	var path = "/realtime?politicians=";
	_.each(reactiveUserSelectedNames.get(), function(name) {  path += name + ","  });
	path += "&timeframe=" + reactiveUserSelectedTimeframe.get();

	// We do no want to re-rendere everything if the path is the same
	// More than that, we do not want to end up with cyclic 
	// rendering see http://www....
	if(_.isEqual(path, previousPath) == false) {
		previousPath = path;
		if(firstTime) {
			firstTime = false;
			return;
		}
		console.log("* The route has changed. We are now going to", path);
		Router.go(path);
	}
}


comboboxObserver = function() {

	// Update route
	Tracker.autorun( function() { updateRoute();  } );
	Tracker.autorun( function() { updateCandidateOptionsCombobox(); } );

	// Tracker.autorun( function() {
	// 	updateSelector();
	// 	updateAddressBar();
	// });
	
	// updateTimeframeData();
	// updateComboBox = Tracker.autorun( function () {
	// 	$("#e1").selectpicker('val', urlParamSelected.get())
	// 			.selectpicker('refresh')
	// 			.selectpicker('render');
	// });
	// updateTimeSelector = Tracker.autorun( function () {
	// 	var time = reactiveTimeframe.get();
	// 	(time.indexOf('past month') !== -1) ? $('#past_month').addClass('active') : $('#past_month').removeClass('active');
	// 	(time.indexOf('past week') !== -1) ? $('#past_week').addClass('active') : $('#past_week').removeClass('active');
	// 	(time.indexOf('past 3 days') !== -1) ? $('#past_3_days').addClass('active') : $('#past_3_days').removeClass('active');
	// 	(time.indexOf('past day') !== -1) ? $('#past_day').addClass('active') : $('#past_day').removeClass('active');
	// 	(time.indexOf('past 8 hours') !== -1) ? $('#past_8_hours').addClass('active') : $('#past_8_hours').removeClass('active');
	// 	(time.indexOf('past hour') !== -1) ? $('#past_hour').addClass('active') : $('#past_hour').removeClass('active');
	// 	(time.indexOf('past 5 min') !== -1) ? $('#past_5_min').addClass('active') : $('#past_5_min').removeClass('active');
	// });
	// updateURL = Tracker.autorun( function () {	
	// 	var goToURL = "/realtime?politicians=";
	// 	_.each(urlParamSelected.get(), function(name) { goToURL += name + "," });
	// 	goToURL += "&timeframe=" + reactiveTimeframe.get();
	// 	Router.go(goToURL);
	// });
	
	Tracker.autorun( function () { updateData(); } );
}

