reactiveUserSelectedNames = new ReactiveVar([], _.isEqual);
reactiveUserSelectedTimeframe = new ReactiveVar("", _.isEqual);

// These reactive variables are supposed to used only after
// the routing to the selected names finishes
reactiveSelectedNames = new ReactiveVar( [] );
reactiveSelectedTwitterHandles = new ReactiveVar( [] );
reactiveStartEndDates = new ReactiveVar( {}, _.isEqual );
reactiveTimeframe = new ReactiveVar( "", _.isEqual );
reactiveNow = new ReactiveVar( false, _.isEqual );

// The purpose of these reactive variable is to store 
// the data loaded from SelectedNames and StartEndDates
reactiveData = new ReactiveVar( {}, _.isEqual );
reactivePlots = new ReactiveVar( {}, _.isEqual );
reactiveTweetCount = new ReactiveVar( {}, _.isEqual );

NameToTwitterID = {};

updateAddressBar = function() {
	//
	Tracker.autorun( function() { pathUpdater();  } );
	Tracker.autorun( function() { newUpdateData(); } );

	// These two methods are there in order to track changes made to the address bar that should
	// be reflected into the widgets
	Tracker.autorun( function() { updateCandidateOptionsCombobox(); } );	
	Tracker.autorun( function() { updatePastTimeToggleButtons(); });
}

