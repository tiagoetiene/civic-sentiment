getPast = function( ref, milliseconds ) {
	return new Date(ref.valueOf() + milliseconds);
}

getTimeFrame = function( time ) {
	if (time.indexOf('past month') !== -1) return -31 * 24 * 60 * 60 * 1000;
	if (time.indexOf('past week') !== -1) return - 7 * 24 * 60 * 60 * 1000;
	if (time.indexOf('past 3 days') !== -1) return - 3 * 24 * 60 * 60 * 1000;
	if (time.indexOf('past day') !== -1) return - 24 * 60 * 60 * 1000;
	if (time.indexOf('past 8 hours') !== -1)  return -  8 * 60 * 60 * 1000;
	if (time.indexOf('past hour') !== -1) return -  1 * 60 * 60 * 1000;
	if (time.indexOf('past 5 min') !== -1) return -  5 * 60 * 1000;
}

findDepthAndInterval = function( interval ) {
	var milliseconds = 1000;
	var idx = 0;

	while(milliseconds < interval)  {
		milliseconds *= 2;
		idx += 1;
	}
	return { depth : idx , interval : milliseconds };
}

var months_abbreviated_en	= [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var months_abbreviated_pt 	= [ 'Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
var months_full_en    			= [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var months_full_pt				= [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var weekday_abbreviated_en	= [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
var weekday_abbreviated_pt	= [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom' ];

forceLocalization = function(text) {
	if(configGetLanguage() !== 'pt-br')
		return text;

	for(var i = 0; i < months_full_en.length; ++i) {
		var replaced = text.replace(months_full_en[i], months_full_pt[i]);
		if(replaced === text)
			continue;
		return replaced;
	}
	for(var i = 0; i < months_abbreviated_en.length; ++i) {
		var replaced = text.replace(months_abbreviated_en[i], months_abbreviated_pt[i]);
		if(replaced === text)
			continue;
		return replaced;
	}
	for(var i = 0; i < weekday_abbreviated_en.length; ++i) {
		var replaced = text.replace(weekday_abbreviated_en[i], weekday_abbreviated_pt[i]);
		if(replaced === text)
			continue;
		return replaced;
	}
	return text;
}


