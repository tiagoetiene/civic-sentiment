ListOfCandidates = [
  {
    candidate : "Jeanne Shaheen",
    party : 'Democratic',
    candidate_image : "resource/500px-Jeanne_Shaheen,_official_Senate_photo_portrait,_2009.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-jeanne-shaheen?hidenav=true",
    iframe_id : "1a0910b2-9765-4caf-8ae0-233ffda2fe1d"
  },
  {
    candidate : "Scott Brown",
    party : 'Republican',
    candidate_image : "resource/500px-Sbrownofficial.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-scott-brown?hidenav=true",
    iframe_id : "b556773a-8f12-4213-ac41-a14a0219ccec"
  },
  {
    candidate : "Barack Obama",
    party : "Democratic",
    candidate_image : "resource/500px-President_Barack_Obama.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-obama?hidenav=true",
    iframe_id : "2e0c206f-9dee-4edb-aafb-f9d71d12c1dc"
  }
]

if (Meteor.isClient) {

  $(document).ready(function() { $("#e1").select2(); });

  Template.twitter_feed.iframe_source = function() {
        return this.iframe_src;
  }

  Template.twitter_feed.iframe_id = function() {
        return this.iframe_id;
  }

  Template.main.list_of_candidates = function() {
    return ListOfCandidates;
  }

  Template.candidate_image.candidate_image = function() {
    return this.candidate_image;
  }


  // var size_0 = candidate_0.output.length;
  // for(var repeat = 0; repeat < 100; ++repeat)
  //   for(var i = 0; i < size_0; ++i)
  //     candidate_0.output.push(candidate_0.output[i]);

  // var size_1 = candidate_1.output.length;
  // for(var repeat = 0; repeat < 100; ++repeat)
  //   for(var i = 0; i < size_1; ++i)
  //     candidate_1.output.push(candidate_1.output[i]);

  // console.log(candidate_0);
  // console.log(candidate_1);

  // var data_0 = [];
  // var data_1 = [];

  // var idx_0 = 1;
  // var idx_1 = 1;

  // var plot = Plot();

  // function generateData() {
  //   var jeanne = candidate_0.output;
  //   var scott = candidate_1.output;

  //   for(var i =data_0.length; i < Math.min(jeanne.length,idx_0); ++i)
  //     data_0.push( {sentiment : jeanne[i].score, date : new Date() } );
  //   idx_0 += 1;

  //   for(var i =data_1.length; i < Math.min(scott.length,idx_0); ++i)
  //     data_1.push( {sentiment : scott[i].score, date : new Date() } );
  //   idx_1 += 1;

  //   var plot_div = d3.select('#plot');
  //   plot_div.data( [ [ data_0, data_1] ] )

  //   plot(plot_div);
  // }

  // setInterval(generateData, 1000)

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
