configGetLanguage = function() {
	return i18n.getLanguage();
}

var lang_en_US = {
		images : {
			coverImage 		: './resource/cover-us.jpg',
			curveExplanation 	: './resource/plot-example.png',
			selectBox			: './resource/select-en.png',
			timeSelector		: './resource/time-selection-en.png',
			backgroundImage 	: './resource/background-en.png',
		},
		options : {
			nhPoliticians : 'New Hampshire',
			americanPoliticians : 'USA',
			brazillianPoliticians : 'Brazil (Presidential Elections 2014)',
			other : 'Others',
		},
		howToSelectPolitician : {
			headline_short 	: 'Select politician',
			headline 		: 'How to select a politician?',
			leadParagraph 	: 'You can select one or more politicians from the dropdown menu:',
		},
		howToSentimentPlot : {
			headline_short 	: 'Sentiment plot',
			headline : 'What is the sentiment chart?',
			leadParagraph : 'Let\'s say you would like to know what people say about Barack Obama on social media. \
							Tweets related to Barack Obama are loaded into a <em>timeline</em>. \
							The timeline will show messages tweeted in a given period, for example, \
							from <em>August 27th 9pm</em> through <em>August 28th 9pm</em>. \
							The blue curve tracks positive tweets and the red curve tracks negative tweets. \
							The higher the peak, the more positive tweets were sent. \
							The lower the valley, the more negative tweets were sent. ',
		},
		howToSelectInterval : {
			headline_short : 'Intervalo de tempo',
			headline : 'How can I select a time frame?',
			leadParagraph : 'You can select a time frame by clicking one of the buttons:',
			paragraph : 'By clicking at <div class="btn-group btn-md"  data-toggle="buttons"> \
						<label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> \
						past month </label></div>, you\'ll see all tweets about Barack Obama for the past 30 days.  \
						By clicking at <div class="btn-group btn-md"  data-toggle="buttons"> \
						<label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> \
						past 5 min </label></div>  you\'ll you can see tweets about Barack Obama as other people tweets them.',
		},
		home : 'Home',
		civicsentiment : 'Civic Sentiment',
		title: 'Civic Sentiment: tracking public feelings toward politicians',
		politicsInRealTime : '#PoliticsInRealTime',
		subtitle : 'Dynamic visualization of civic sentiment on political candidates, issues, and events',
		pastMonth : 'past month',
		pastWeek : 'past week',
		past3Days : 'past 3 days',
		pastDay : 'past day',
		past8Hours : 'past 8 hours',
		pastHour : 'past hour',
		past5Min : 'past 5 min',
		selectPolitician : 'Select a politician',
		like : 'Like',
		dislike : 'Dislike',
		sentiment : 'Sentiment',
		tweets : 'tweets',
		close : 'x',
		language : 'Português do Brasil',
		toplinks : 'Top links',
		about : "about",
		Loading : 'Loading',
		users : 'users',
		online : 'online',
		teaserQuestion : 'What people are saying about politicians',
		goalStatement : 'We all have a feeling for what people are saying about one politician or another. \
						Here you can visualize people\'s feelings towards politicians in real-time using a <em>Sentiment chart</em>.',
		knowMore : 'How do I get started?',
		getStarted : 'I get it. Let\'s get started!',
		aboutHeadline : 'Who\'s behind Civic Sentiment?',
		aboutLeadParagraph : 'Civic Sentiment was born during a Reynolds Journalism Institute Hackaton. \
								More info... links, media coverage, etc... still working on it',
		bio : {
			etiene : '<b>Tiago Etiene</b> was born in Ouro Preto, Brazil. \
					He studied at the University of São Paulo and University of Utah, \
					where he specialized in Scientific Visualization. \
					His interests include Big Data, Data Analysis and Visualization, \
					Computer Graphics, and more.',
			kristen : ' <b>Kristen Nevious</b>',
			deepesh : '<b>Deepesh Kuruppath</b>',
			lorraine : '<b>Lorraine Dechter</b>',
			amy : '<b>Amy</b>'
		},
	};
var lang_pt_BR = {
		images : {
			coverImage 		: './resource/cover-pt.jpg',
			curveExplanation 	: './resource/plot-pt.png',
			selectBox			: './resource/select-pt.png',
			timeSelector		: './resource/time-selection-pt.png',
			backgroundImage 	: './resource/background-pt.png',
		},
		options : {
			nhPoliticians : 'Nova Hampshire',
			brazillianPoliticians : 'Brasil (Eleições 2014)',
			americanPoliticians : 'EUA',
			other : 'Outros',
		},
		howToSelectPolitician : {
			headline_short 	: 'Selecione político',
			headline 		: 'Como selecionar um político?',
			leadParagraph 	: 'Um ou mais políticos podem ser selectionados através do menu:',
		},
		howToSentimentPlot : {
			headline_short 	: 'Sentimento',
			headline : 'O que é o gráfico de sentimento?',
			leadParagraph : 'Digamos que você tem interesse em saber o que outras pessoas estão falando a respeito da \
						Dilma Rousseff nas mídias sociais. O gráfico de sentimento mostra os tuítes relacionados à Dilma \
						numa <em>linha do tempo</em>. \
						A Linha do tempo mostra as mensagens tuítadas em um determinado período de tempo, digamos, \
						do dia <em>27 de Agosto 9pm</em> até <em>28 de Agosto 9pm</em>. \
						A curva azul representa tuítes positivos, enquanto a vermelha representa tuítes negativos. \
						Quanto maior o pico da curva, mais tuítes positivos foram encontrados nas redes sociais. \
						Quanto menor o vale, mais tuítes negativos foram encontrados. ',
		},
		howToSelectInterval : {
			headline_short : 'Intervalo de tempo',
			headline : 'Como escolher um intervalo de tempo?',
			leadParagraph : 'Você escolhe um intervalo de tempo clicando em um do botões:',
			paragraph : 'Clicando no botão <div class="btn-group btn-md"  data-toggle="buttons"> \
						<label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> \
						último mês </label></div>, você visualizará os tuítes sobre Dilma Rousseff dos últimos 30 dias.  \
						Agora, clicando em <div class="btn-group btn-md"  data-toggle="buttons"> \
						<label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> último 5 min \
						</label></div> os túites sobre Dilma aparecerão em tempo real, assim que as pessoas tuítarem.',
		},
		home : 'Início',
		civicsentiment : 'Opinião do Eleitor',
		title: 'Opinião do Eleitor: visualizando o que as pessoas acham de políticos',
		politicsInRealTime : '#PolíticaEmTempoReal',
		subtitle : 'Visualização da opinião do eleitor a respeito de políticos, propostas, e eventos',
		pastMonth : 'último mês',
		pastWeek : 'última semana',
		past3Days : 'últimos 3 dias',
		pastDay : 'último dia',
		past8Hours : 'últimos 8 horas',
		pastHour : 'última hora',
		past5Min : 'últimos 5 min',
		selectPolitician : 'Selecione um político',
		like : 'Bom',
		dislike : 'Ruim',
		sentiment : 'Sentimento',
		tweets : 'tuítes',
		close : 'x',
		language : 'US English',
		toplinks : 'Top links',
		about : "sobre",
		Loading : 'Carregando',
		users : 'usuários',
		online : 'conectados',
		teaserQuestion : 'O que os eleitores dizem a respeito de políticos?',
		goalStatement : 'Todos nós temos uma idéia do que as pessoas falam a respeito de políticos. \
						  Aqui, você pode visualizar o sentimento das pessoas nas mídias sociais usando o <em>gráfico de Sentimento</em>.',
		getStarted : 'Entendi. Vamos começar!',
		aboutHeadline : 'Quem fez o Opinião do Leitor?',
		aboutLeadParagraph : 'Opinião do Eleitor nasceu durante uma Hackaton promovido pelo Reynolds Journalism Institute \
							em São Francisco, CA.',
		bio : {
			etiene : '<b>Tiago Etiene</b> nasceu em Ouro Preto, Minas Gerais. \
					Ele estudou na USP/São Carlos e Universidade de Utah, EUA, onde ele se especializou em Visualização Científica. \
					Possui interesse em <em>Big Data</em>, Análise de Dados, Visualização, Computação Gráfica, e mais.',
			kristen : ' <b>Kristen Nevious</b>',
			deepesh : '<b>Deepesh Kuruppath</b>',
			lorraine : '<b>Lorraine Dechter</b>',
			amy : '<b>Amy</b>'
		},
	};

configInternationalization = function() {
	i18n.map('en-us', lang_en_US);
	i18n.map('en', lang_en_US);
	i18n.map('pt', lang_pt_BR);
	i18n.map('pt-br', lang_pt_BR);

	i18n.setLanguage(navigator.language.toLowerCase());
	// i18n.setLanguage('pt-br');
	// i18n.setDefaultLanguage('en_US');
	i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');
}
