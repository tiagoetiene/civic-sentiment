Template.onlineUsers.numberOfOnlineUsers = function() {
	var user_count = Session.get('numberOfUsers');
	if(user_count === 0 || user_count === undefined)
		return '';
	return user_count + ' ' + i18n('users') + ' ' + i18n('online');
};

setInterval(function() {
	Session.set('numberOfUsers', Meteor.users.find().count());
}, 5000);