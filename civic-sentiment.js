if (Meteor.isClient) {
  var size_0 = candidate_0.output.length;
  for(var repeat = 0; repeat < 100; ++repeat)
    for(var i = 0; i < size_0; ++i)
      candidate_0.output.push(candidate_0.output[i]);

  var size_1 = candidate_1.output.length;
  for(var repeat = 0; repeat < 100; ++repeat)
    for(var i = 0; i < size_1; ++i)
      candidate_1.output.push(candidate_1.output[i]);

  console.log(candidate_0);
  console.log(candidate_1);

  var data_0 = [];
  var data_1 = [];

  var idx_0 = 1;
  var idx_1 = 1;

  var plot = Plot();

  function generateData() {
    var jeanne = candidate_0.output;
    var scott = candidate_1.output;

    for(var i =data_0.length; i < Math.min(jeanne.length,idx_0); ++i)
      data_0.push( {sentiment : jeanne[i].score, date : new Date() } );
    idx_0 += 1;

    for(var i =data_1.length; i < Math.min(scott.length,idx_0); ++i)
      data_1.push( {sentiment : scott[i].score, date : new Date() } );
    idx_1 += 1;

    var plot_div = d3.select('#plot');
    plot_div.data( [ [ data_0, data_1] ] )

    plot(plot_div);
  }

  setInterval(generateData, 1000)

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
