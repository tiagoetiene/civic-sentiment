Template.TwitterFeedT.rendered = function() {
	if (!window.WAYIN) {
		window.WAYIN = {hubs: []};}
		window.WAYIN.hubs.push(
			{
				hub_iframe: document.getElementById(this.data.iframe_id),
				not_use_outer_iframe:false,
				vexpand:false,
				allows_dialogs:true,
				updates_url:false
			});
		(function() {
			if (document.getElementById('wayin-hub-embedd-script')) {
				return;
			} else {
				var script = document.createElement('script');
				script.id = 'wayin-hub-embedd-script';
				script.type = 'text/javascript';
				script.src = '//rjihacks.wayinhub.com/scripts/iframe-onload.js';
				document.body.appendChild( script );
			}
		})();
}