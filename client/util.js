
addRandomDate = function() {

	var d = new Date();

	// var days = 0;
	// var hours = 0;
	// var minutes = 0;

	var days = Math.round(Math.random() * 7);
	var hours = Math.round(Math.random() * 24);
	var minutes = Math.round(Math.random() * 60);
	var seconds = Math.round(Math.random() * 60);
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