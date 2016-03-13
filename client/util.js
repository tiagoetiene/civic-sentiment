twitterHandleDepthPair = function( name, depth ) {
	return NameToTwitterID[ name ] + ":" + depth;
}

getPast = function( ref, milliseconds ) {
	return new Date(ref.valueOf() + milliseconds);
}

TotalNumberOfMilliseconds = {
	month : 31 * 24 * 60 * 60 * 1000,
	week : 7 * 24 * 60 * 60 * 1000,
	three_days : 3 * 24 * 60 * 60 * 1000,
	day : 24 * 60 * 60 * 1000,
	five_hours : 5 * 60 * 60 * 1000,
	hour : 1 * 60 * 60 * 1000,
	five_min : 5 * 60 * 1000
}

getTimeFrame = function( time ) {
	if (time.indexOf('past month') !== -1) return -TotalNumberOfMilliseconds.month;
	if (time.indexOf('past week') !== -1) return -TotalNumberOfMilliseconds.week;
	if (time.indexOf('past 3 days') !== -1) return -TotalNumberOfMilliseconds.three_days;
	if (time.indexOf('past day') !== -1) return -TotalNumberOfMilliseconds.day;
	if (time.indexOf('past 5 hours') !== -1)  return -TotalNumberOfMilliseconds.five_hours;
	if (time.indexOf('past hour') !== -1) return -TotalNumberOfMilliseconds.hour;
	if (time.indexOf('past 5 min') !== -1) return -TotalNumberOfMilliseconds.five_min;
}

findDepthAndInterval = function( interval ) {
	var milliseconds = 1000;
	var idx = 0;

	while(milliseconds < interval)  {
		milliseconds *= 4;
		idx += 1;
	}
	return { depth : idx , interval : milliseconds };
}