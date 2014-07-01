var TWO_PI = 6.2831853071795864769252866
function normal( param ) {
	var rand1 = Math.random();
	rand1 = -2 * Math.log(rand1);
	var rand2 = Math.random() * TWO_PI;
 
	return param.mean + Math.sqrt(param.dev * rand1) * Math.cos(rand2);
}
addRandomDate = function() {
	var d = new Date();
	var days    = Math.round(  Math.random() * 7  );
	var hours   = Math.round(  Math.random() * 24 );
	var minutes = Math.round( Math.random() * 60 );
	var seconds = Math.round(  Math.random() * 60 );
	var ret = new Date(
		d.getFullYear(),
		d.getMonth(),
		d.getDate() - days,
		d.getHours() - hours,
		d.getMinutes() - minutes,
		d.getSeconds() - seconds,
		0 // Milliseconds
		);
	return ret;
}

addRandomDatum = function() {
	var d = addRandomDate();
	return {
		score : Math.random()*2-1,
		date  : d,
	}
}

getPast = function( ref, day, hour, min, sec ) {
	return new Date(ref.getFullYear(),
                    ref.getMonth(),
                    ref.getDate() + day,
                    ref.getHours() + hour,
                    ref.getMinutes() + min,
                    ref.getSeconds() + sec,
                    ref.getMilliseconds());
}