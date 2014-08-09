configInternationalization = function() {
	i18n.map('en-us', {
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
	});

	i18n.map('pt-br', {
		backgroundImage : './resource/congresso-nacional.png',
		civicsentiment : 'Sentimento Público',
		title: 'Sentimento Público: visualizando o que as pessoas acham de políticos',
		politicsInRealTime : '#PolíticaEmTempoReal',
		subtitle : 'Visualização do sentimento público a respeito de políticos, propostas, e eventos',
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
	});

	// i18n.setLanguage(navigator.language.toLowerCase());
	i18n.setLanguage('pt-br');
	i18n.setDefaultLanguage('en_US');
	i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');
}
