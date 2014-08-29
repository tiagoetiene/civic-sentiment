configGetLanguage = function() {
	return i18n.getLanguage();
}

var lang_en_US = {
		backgroundImage : './resource/inauguration.png',
		coverImage : './resource/us_congress.jpg',
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
		brazillianPoliticians : 'Brazil (Presidential Elections 2014)',
		americanPoliticians : 'USA',
		nhPoliticians : 'New Hampshire',
		language : 'Português do Brasil',
		toplinks : 'Top links',
		about : "about",
		Loading : 'Loading',
		users : 'users',
		online : 'online',
		teaserQuestion : 'What people are saying about politicians',
		goalStatement : 'We all have a feeling for what people are saying about one politician or another. Our goal is to visualize what people say on social media about politicians.',
		knowMore : 'How do I get started?',
		getStarted : 'I get it. Let\'s get started!',
		cover1Headline : 'How do I get started?',
		cover1LeadParagraph : 'Let\'s say you would like to know what people say about Barack Obama on social media. \
						You started by selecting Barack Obama from the dropdown menu:',
		cover1Content0 : 'Now, tweets related to Barack Obama are loaded into a <em>timeline</em>. \
						The timeline will show messages tweeted in the period chosen by John, say, \
						from <em>August 27th 9pm</em> through <em>August 28th 9pm</em>. \
						The blue curve tracks positive tweets and the red curve tracks negative tweets. \
						The higher the peak, the more positive tweets were sent. \
						The lower the valley, the more negative tweets were sent. ',
		cover2Headline : 'How can I select a time frame?',
		cover2LeadParagraph : 'You can select a time frame by click at one of the buttons:',
		cover2Content0 : 'By clicking at <div class="btn-group btn-md"  data-toggle="buttons"><label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> past month </label></div>, you\'ll see all tweets about Barack Obama for the past 30 days.  By clicking at <div class="btn-group btn-md"  data-toggle="buttons"><label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> past 5 min </label></div>  you\'ll you can see tweets about Barack Obama as other people tweets them.',
		aboutHeadline : 'Who\'s behind Civic Sentiment?',
		aboutLeadParagraph : 'Civic Sentiment was born during a San Francisco Reynolds Journalism Institute Hackaton. More info...',
		aboutEtiene : '<b>Tiago Etiene</b> was born in Ouro Preto, Brazil. He studied at the University of São Paulo and University of Utah, where he\'s specialized in Scientific Visualization. His interests include Big Data, Data Analysis and Visualization, Computer Graphics, and more.'
	};
var lang_pt_BR = {
		backgroundImage : './resource/congresso-nacional.png',
		coverImage : './resource/br_congresso.jpg',
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
		brazillianPoliticians : 'Brasil (Eleições 2014)',
		americanPoliticians : 'EUA',
		nhPoliticians : 'Nova Hampshire',
		language : 'US English',
		toplinks : 'Top links',
		about : "sobre",
		Loading : 'Carregando',
		users : 'usuários',
		online : 'conectados',
		teaserQuestion : 'O que os eleitores dizem a respeito de políticos?',
		goalStatement : 'Todos nós temos uma idéia do que as possoas falam a respeito de políticos, não? O objetivo é visualizar o que as pessoas dizem nas mídias sociais.',
		getStarted : 'Entendi. Vamos começar!',
		cover1Headline : 'Quero entender mais',
		cover1LeadParagraph : 'Digamos que você tem interesse em saber o que outras pessoas estão falando a respeito da Dilma Rousseff nas mídias sociais. \
						O primeiro passo é selectionar Dilma Rousseff no menu "Selecione um Político":',
		cover1Content0 : 'Após a seleção, os tuítes relacionados à Dilma aparecerão na <em>linha do tempo</em>. \
						A Linha do tempo mostra as mensagens tuítadas em um determinado período de tempo, digamos, \
						do dia <em>27 de Agosto 9pm</em> até <em>28 de Agosto 9pm</em>. \
						A curva azul> representa tuítes positivos, enquanto a curva vermelha representa tuítes negativos. \
						Quanto maior o pico da curva, mais tuítes positivos foram encontrados nas redes sociais. \
						Quanto menor o vale, mais tuítes negativos foram encontrados. ',
		cover2Headline : 'Como escolher um intervalo de tempo?',
		cover2LeadParagraph : 'Você escolhe um intervalo de tempo clicando em um do botões:',
		cover2Content0 : 'Clicando no botão <div class="btn-group btn-md"  data-toggle="buttons"><label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> último mês </label></div>, você visualizará os tuítes sobre Dilma Rousseff dos últimos 30 dias.  Agora, clicando em <div class="btn-group btn-md"  data-toggle="buttons"><label class="btn btn-small btn-primary"> <input type="radio" name="options" checked> último 5 min </label></div> os túites sobre Dilma aparecerão em tempo-real, assim que as pessoas tuítarem.',
		aboutHeadline : 'Quem fez o Opinião do Leitor?',
		aboutLeadParagraph : 'Opinião do Eleitor nasceu durante uma Hackaton promovido pelo Reynolds Journalism Institute em São Francisco, CA. More info...',
		aboutEtiene : '<b>Tiago Etiene</b> nasceu em Ouro Preto, Minas Gerais. Ele estudou na USP/São Carlos e Universidade de Utah, EUA, onde ele se especializou em Visualização Científica. Ele tem interesse em <em>Big Data</em>, Análise de Dados, Visualização, Computação Gráfica, e mais.',
	};

configInternationalization = function() {
	i18n.map('en-us', lang_en_US);
	i18n.map('en', lang_en_US);
	i18n.map('pt-br', lang_pt_BR);

	i18n.setLanguage(navigator.language.toLowerCase());
	// i18n.setLanguage('pt-br');
	// i18n.setDefaultLanguage('en_US');
	i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');
}
