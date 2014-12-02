var first = true;
var previousPath = "/realtime?p=";
pathUpdater = function() {
	// console.log("* Updating path");

	var timeframe = reactiveUserSelectedTimeframe.get();
	var path = "/realtime?p=";

	_.each(reactiveUserSelectedNames.get(), function(name) {  path += name + ","  });

	if(timeframe && _.isEmpty( timeframe ) == false)
		path += "&t=" + timeframe;

	// We do no want to re-rendere everything if the path is the same
	// More than that, we do not want to end up with cyclic 
	// rendering see http://www....
	// console.log("\t* previous path: ", previousPath );
	// console.log("\t* current path: ", path );

	if( first == true ) {
		first = false;
		return;
	}
	if(_.isEqual(path, previousPath) == false) {
		previousPath = path;
		console.log("\t* The route has changed. We are now going to", path);
		Router.go(path);
	}
}