configGetLanguage = function() {
	return i18n.getLanguage();
}

var lang_en_US = {
		backgroundImage : './resource/inauguration.png',
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
	};
var lang_pt_BR = {
		backgroundImage : './resource/congresso-nacional.png',
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
		like : 'Gosta',
		dislike : 'Não gosta',
		sentiment : 'Sentimento',
		tweets : 'tuítes',
		close : 'x',
		brazillianPoliticians : 'Brasil (Eleições 2014)',
		americanPoliticians : 'EUA',
		nhPoliticians : 'Nova Hampshire',
		language : 'US English',
		toplinks : 'Top links',
	};

configInternationalization = function() {
	i18n.map('en-us', lang_en_US);
	i18n.map('en', lang_en_US);
	i18n.map('pt-br', lang_pt_BR);

	i18n.setLanguage(navigator.language.toLowerCase());
	// i18n.setLanguage('pt-br');
	i18n.setDefaultLanguage('en_US');
	i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');
}
