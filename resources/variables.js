var u = new Date();
var v = new Date(+u);
v.setDate(v.getDate() - 7);
millisecondsInAWeek =  +u - (+v);
