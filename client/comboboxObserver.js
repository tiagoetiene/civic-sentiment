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


updateAddressBar = function() {
	Tracker.autorun( function() { updateRoute();  } );
	Tracker.autorun( function() { updateCandidateOptionsCombobox(); } );	
	Tracker.autorun( function () { updateData(); } );
}

