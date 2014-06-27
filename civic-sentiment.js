AllCandidates = [
  {
    name : "Jeanne Shaheen",
    party : 'Democratic',
    image : "resource/500px-Jeanne_Shaheen,_official_Senate_photo_portrait,_2009.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-jeanne-shaheen?hidenav=true",
    iframe_id : "1a0910b2-9765-4caf-8ae0-233ffda2fe1d"
  },
  {
    name : "Scott Brown",
    party : 'Republican',
    image : "resource/500px-Sbrownofficial.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-scott-brown?hidenav=true",
    iframe_id : "b556773a-8f12-4213-ac41-a14a0219ccec"
  },
  {
    name : "Barack Obama",
    party : "Democratic",
    image : "resource/500px-President_Barack_Obama.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-obama?hidenav=true",
    iframe_id : "2e0c206f-9dee-4edb-aafb-f9d71d12c1dc"
  },
  {
    name : "Dilma Rousseff",
    party : "Partido dos Trabalhadores",
    image : "resource/500px-Dilma_Rousseff.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-dilma-rousseff?hidenav=true",
    iframe_id : "63ac1d56-e8fe-4a70-8dfd-f344e7fc2fc7"
  },
  {
    name : "Eric Cantor",
    party : "Republican",
    image : "resource/500px-Eric_Cantor,_official_113th_Congress_photo_portrait.jpg",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-eric-cantor?hidenav=true",
    iframe_id : "eb7564ba-4e32-46b9-b30f-eef5a85f6727"
  },
  {
    name : "Gerard Beloin",
    party : "Republican",
    image : ".",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-gerard-beloin?hidenav=true",
    iframe_id : "0c80f9f3-bb50-4534-a7d7-7217b6a5443d"
  },
  {
    name : "Robert D'Arcy",
    party : "Republican",
    image : ".",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-robert-darcy?hidenav=true",
    iframe_id : "a22a7b4c-5125-4254-8c07-49ac1549d774"
  },
  {
    name : "Bob Smith",
    party : "Republican",
    image : "http://bobsmithforussenate.com/wp-content/gallery/march-4-campaign-kickoff/003.png",
    iframe_src : "//rjihacks.wayinhub.com/cv-page-bob-smith?hidenav=true",
    iframe_id : "e41192a2-070c-456f-b9b8-8c18ead29d20"
  },
]

SelectedCandidates = []

if (Meteor.isClient) {

  $(document).ready(function() { 
    $("#e1").select2({placeholder: "Select a politician"})
                .on("change", function(e) {
                  var found = false; 
                  for(var i = 0; i < SelectedCandidates.length; ++i)
                    if(e.val.indexOf(SelectedCandidates[i].name) != -1)
                      found = true;
                  if(found == true)
                    return
                  for(var i = 0; i < AllCandidates.length; ++i)
                    if(e.val.indexOf(AllCandidates[i].name) != -1) {
                      SelectedCandidates.push(AllCandidates[i]);
                      Session.set('ListOfCandidates', !(Session.get('ListOfCandidates') == true) );
                      return
                    }
                })

    $("#pastWeek").change( function(e) { console.log($(this).attr('id')) })
    $("#pastDay").change( function(e) { console.log($(this).attr('id')) })
    $("#pastHour").change( function(e) { console.log($(this).attr('id')) })
    $("#past5Min").change( function(e) { console.log($(this).attr('id')) })
    $("#past1Min").change( function(e) { console.log($(this).attr('id')) })
  });
  
  Template.twitter_feed.iframe_source = function() {
        return this.iframe_src;
  }

  Template.twitter_feed.iframe_id = function() {
        return this.iframe_id;
  }

  Template.candidate_name.name = function() {
    return this.name;
  }

  Template.main.list_of_candidates = function() {
    Session.get('ListOfCandidates')
    return SelectedCandidates;
  }

  Template.close_button.events =  {
    'click h5': function (event) {
      var _this = this;
      SelectedCandidates = _.filter(SelectedCandidates, function(data) {
        return data.iframe_id.localeCompare(_this.iframe_id) != 0;
      });

      // Updating WAYIN data
      window.WAYIN.hubs = _.filter(window.WAYIN.hubs, function(hub) {
        return hub.hub_iframe.id.localeCompare(_this.iframe_id) != 0;
      })
      Session.set('ListOfCandidates', !(Session.get('ListOfCandidates') == true) );
    }
  }

  Template.candidate_image.candidate_image = function() {
    return this.image;
  }

  Template.candidate_image.image_height = function() {
    Session.get('UpdateImageHeight');
    var height = $('#'+this.iframe_id).height();
    if(height == null)
      return '268px';
    return height + 'px';
  }

  function tmp_plot() {
    var size_0 = candidate_0.output.length;
    for(var repeat = 0; repeat < 100; ++repeat)
      for(var i = 0; i < size_0; ++i)
        candidate_0.output.push(candidate_0.output[i]);

    var size_1 = candidate_1.output.length;
    for(var repeat = 0; repeat < 100; ++repeat)
      for(var i = 0; i < size_1; ++i)
        candidate_1.output.push(candidate_1.output[i]);

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

    // Hack to fix image size. I've been trying to get the Wayin widget to be shaped as a perfect square
    // but I did not succeed. Thus, this hack will solve the problem.
    setInterval(function() {Session.set('UpdateImageHeight', !(Session.get('UpdateImageHeight') == true));}, 1000);
  }
  tmp_plot();

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
