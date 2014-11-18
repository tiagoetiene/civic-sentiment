var previousPath = "";
pathUpdater = function() {
	console.log("* Updating path");
	var path = "/realtime?politicians=";
	_.each(reactiveUserSelectedNames.get(), function(name) {  path += name + ","  });

	// We do no want to re-rendere everything if the path is the same
	// More than that, we do not want to end up with cyclic 
	// rendering see http://www....
	console.log("\t* previous path: ", previousPath );
	console.log("\t* current path: ", path )
	if(_.isEqual(path, previousPath) == false) {
		previousPath = path;
		console.log("\t* The route has changed. We are now going to", path);
		Router.go(path);
	}
}