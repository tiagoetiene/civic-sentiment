getPast = function( ref, milliseconds ) {
	return new Date(ref.valueOf() + milliseconds);
}