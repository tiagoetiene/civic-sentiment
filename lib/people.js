People = function(  ) {

	function handler( _ ) { 
		if( arguments.length !== 0 )
			return _people[ _ ];
		return _people;
	};

	handler.hasSelected = function() {
		for(var i = 0; i < _people.length; ++i) 
			if(_people[i].selected === true)
				return true;
		return false;
	};

	handler.selected = function() {
		var selected = [];
		_.each(_people, function( person ) { if( person.selected ) selected.push( person ); });
		return selected;
	};

	handler.visible = function( name ) {
		for(var i = 0; i < _people.length; ++i) 
			if(_people[i].name.indexOf(name) !== -1 && _people[i].selected)
				return true;
		return false;
	};

	handler.politicians = function( _ ) {
		if( !arguments.length )
			return _people;
		return _people[ _ ];
	};

	handler.size = function() {
		return _people.length;
	};

	handler.types = function() {
		var types = {};
		_.each(_people, function(person) { types[ person.type ] = true; });
		return Object.keys( types );
	};

	handler.selectByType = function( type ) {
		var selected = [];
		_.each( _people, function( person ) { 
			if( person.type.indexOf(type) !== -1 ) 
				selected.push( person ); 
		});
		return selected;
	};

	var _people = [
					{ 
						name : "Jeanne Shaheen",
						party : 'Democratic',
						image : "resource/500px-Jeanne_Shaheen,_official_Senate_photo_portrait,_2009.jpg",
						iframe_src : "//rjihacks.wayinhub.com/cv-page-jeanne-shaheen?hidenav=true",
						iframe_id : "1a0910b2-9765-4caf-8ae0-233ffda2fe1d",
						color : '#2980B9',
						id : 'Shaheen',
						type : 'americanPoliticians',
					},
					{ 
						name : "Scott Brown",
						party : 'Republican',
						image : "resource/500px-Sbrownofficial.jpg",
						iframe_src : "//rjihacks.wayinhub.com/cv-page-scott-brown?hidenav=true",
						iframe_id : "b556773a-8f12-4213-ac41-a14a0219ccec",
						color : '#C0392B',
						id : 'Brown',
						type : 'americanPoliticians',
					},
					{
						name : "Barack Obama",
						party : "Democratic",
						image : "resource/500px-President_Barack_Obama.jpg",
						iframe_src : "//rjihacks.wayinhub.com/cv-page-obama?hidenav=true",
						iframe_id : "2e0c206f-9dee-4edb-aafb-f9d71d12c1dc",
						color : '#2980B9',
						id : 'Obama',
						type : 'americanPoliticians',
					},
					{
						name : "Dilma Rousseff",
						party : "Partido dos Trabalhadores",
						image : "resource/500px-Dilma_Rousseff.jpg",
						iframe_src : "//rjihacks.wayinhub.com/cv-page-dilma-rousseff?hidenav=true",
						iframe_id : "63ac1d56-e8fe-4a70-8dfd-f344e7fc2fc7",
						color : 'darkred',
						id : 'Rousseff',
						type : 'brazillianPoliticians',
					},
					{
						name : 'Aécio Neves',
						party : 'PSDB',
						image : 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Aécio_Neves_em_junho_de_2013_-_2.jpg/320px-Aécio_Neves_em_junho_de_2013_-_2.jpg',
						iframe_src : "//rjihacks.wayinhub.com/cv-page-aecio-neves?hidenav=true",
						iframe_id : "4edd4db7-6b61-4100-baaf-881a065ad10d",
						color : '#2980B9',
						id : 'Neves',
						type : 'brazillianPoliticians',
					}];
	return handler;
};
