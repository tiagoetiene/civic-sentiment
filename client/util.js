var TWO_PI = 6.2831853071795864769252866
function normal( param ) {
	var rand1 = Math.random();
	rand1 = -2 * Math.log(rand1);
	var rand2 = Math.random() * TWO_PI;
 
	return param.mean + Math.sqrt(param.dev * rand1) * Math.cos(rand2);
}
addRandomDate = function() {
	var d = new Date();
	var days    = Math.round( Math.abs( normal( {mean:0, dev: 0.1} )));
	var hours   = Math.round( Math.abs( normal( {mean:0, dev:0.1} )));
	var minutes = Math.round( Math.abs( normal( {mean:0, dev:0.1} )));
	var seconds = Math.round( Math.abs( normal( {mean:0, dev:30} )));
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
		score : Math.sin( Math.random()*0.2 + d.getDay() + d.getHours() / 24 ),
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