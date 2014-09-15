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
						type : 'nhPoliticians',
					},
					{ 
						name : "Scott Brown",
						party : 'Republican',
						image : "resource/500px-Sbrownofficial.jpg",
						iframe_src : "//rjihacks.wayinhub.com/cv-page-scott-brown?hidenav=true",
						iframe_id : "b556773a-8f12-4213-ac41-a14a0219ccec",
						color : '#C0392B',
						id : 'Brown',
						type : 'nhPoliticians',
					},
					{
						name : 'Marilinda Garcia',
						party : 'Republican',
						image : 'https://sm21nationbuilder.s3.amazonaws.com/marilindagarcia/meet-marilinda-1-2.jpg',
						iframe_src : "//rjihacks.wayinhub.com/cv-page-marilinda-garcia?hidenav=true",
						iframe_id : "78e3a8b4-6e8e-4c09-ba45-ecf092b428dd",
						color : '#C0392B',
						id : 'Garcia',
						type : 'nhPoliticians',
					},
					{
						name : 'Jim Lawrence',
						party : 'Republican',
						image : 'http://nebula.wsimg.com/9019f1afdc18c9b671d1c56c7adeef6c?AccessKeyId=F03292B3BEBCBA36652D&disposition=0&alloworigin=1',
						iframe_src : "//rjihacks.wayinhub.com/jim-lawrence?hidenav=true",
						iframe_id : "71dd2770-f639-4d9e-81e8-25ab91dce9f0",
						color : '#C0392B',
						id : 'Lawrence',
						type : 'nhPoliticians',
					},
					{
						name : 'Gary Lambert',
						party : 'Republican',
						image : 'http://www.newbostongop.org/sites/default/files/u28/gary_lambert.jpg',
						iframe_src : "//rjihacks.wayinhub.com/cv-page-gary-lambert?hidenav=true",
						iframe_id : "0bb8661d-a5b4-417a-af75-54cd053a4054",
						color : '#C0392B',
						id : 'Lambert',
						type : 'nhPoliticians',
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
						image : 'https://lh4.googleusercontent.com/-O6wULF3GnJc/U9mKGp_ik6I/AAAAAAAADzo/KxZY6PWn32A/s998-no/avatarAecio_01-2.jpg',
						iframe_src : "//rjihacks.wayinhub.com/cv-page-aecio-neves?hidenav=true",
						iframe_id : "4edd4db7-6b61-4100-baaf-881a065ad10d",
						color : '#2980B9',
						id : 'Neves',
						type : 'brazillianPoliticians',
					},
					{
						name : 'Marina Silva',
						party : 'PSB',
						image : 'https://scontent-2.2914.fna.fbcdn.net/hprofile-xfp1/v/t1.0-1/c0.0.320.320/p320x320/1909618_819009934777305_8787702962127061796_n.jpg?oh=84352c51efa242f3274d9d193656ab34&oe=549125B8',
						iframe_src : "//rjihacks.wayinhub.com/cv-page-marina-silva?hidenav=true",
						iframe_id : "37cfbfa2-461c-47be-9a6f-a798f9149cd5",
						color : '#34495e',
						id : 'Silva',
						type : 'brazillianPoliticians',
					},
					{
						name : 'Pastor Everaldo',
						party : 'PSC',
						image : 'http://static.eleicoes2014.com.br/upload/images/pa/st/pastor-everaldo.jpg',
						iframe_src : "//rjihacks.wayinhub.com/cv-page-pastor-everaldo?hidenav=true",
						iframe_id : "84f168a6-024f-4a5d-88c2-369cbbc68efb",
						color : '#darkgreen',
						id : 'Everaldo',
						type : 'brazillianPoliticians',
					},
					{
						name : 'Luciana Genro',
						party : 'PSOL',
						image : 'https://s3-sa-east-1.amazonaws.com/financiamentopopular/psol/lucianagenro/lg.png',
						iframe_src : "//rjihacks.wayinhub.com/cv-luciana-genro?hidenav=true",
						iframe_id : "609cb685-884e-4314-aaf5-b97d97ed5472",
						color : '#darkorange',
						id : 'Genro',
						type : 'brazillianPoliticians',
					},
					// {
					// 	admin : true,
					// 	name : 'Anita Sarkeesian',
					// 	party : '',
					// 	image : 'https://pbs.twimg.com/profile_images/378800000098106734/80ff231b36590db42da8e7045109fd4b_400x400.jpeg',
					// 	iframe_src : "//rjihacks.wayinhub.com/new-page-1?hidenav=true",
					// 	iframe_id : "abee043c-09fc-4339-ab22-a82c65e6b3c5",
					// 	color : '#darkorange',
					// 	id : 'Sarkeesian',
					// 	type : 'other',
					// }
					];
	return handler;
};
