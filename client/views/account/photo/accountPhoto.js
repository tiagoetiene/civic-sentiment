Template.AccountPhotoT.helpers({
	image : function() {
		return this.profile_image_url.replace("_normal", "");
	}
});