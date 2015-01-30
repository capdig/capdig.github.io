window.addEvent("domready", function() {
	new Request.JSONP({
		url       : 'https://api.github.com/orgs/capdig/members',
		data      : {access_token: 'f2e198c12d48167708219ccd6e42f50a1ac79ddd'},
		onComplete: function( response ) {
			users = $('capdig-users');

			Object.each(response.data, function( memberItem ) {
				new Request.JSONP({
					url       : memberItem.url,
					data      : {access_token: 'f2e198c12d48167708219ccd6e42f50a1ac79ddd'},
					onComplete: function( response ) {
						fig = new Element('figure');

						img = new Element('img.user-img').set("src", memberItem.avatar_url);
						fig.grab(img);

						cap = new Element('figcaption').set('text', response.data.name.split(" ")[0]);
						fig.grab(cap)

						users.grab(fig);
					}
				}).send();
			});
		}
	}).send();
});
