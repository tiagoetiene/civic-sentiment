Session.keys = [];

reactiveUserSelectedNames = new ReactiveVar([], _.isEqual);

Session.setDefault( "CurrentDepth", 7 );
Session.setDefault( "CurrentInterval", ( 31 * 24 * 60 * 60 * 1000 ) / HistogramBins );

NameToTwitterID = {};
NameToCursor = {};

updateAddressBar = function() {
	Tracker.autorun( newUpdateData );
	Tracker.autorun( subscribeToUserSelectedPoliticians );
}

