window.addEvent("domready", function() {
	var bios = {
		"donatj"         : { 
			"title" : "Programmer",
			"desc"  : "Keyboard collector"
		},
		"henderjon"   : { 
			"title" : "Lead Programmer",
			"desc"  : "Half beard, all man"
		},
		"oranj"       : { 
			"title" : "Programmer",
			"desc"  : "Fire giant"
		},
		"phanzink"    : { 
			"title" : "Programmer",
			"desc"  : "Headphone aficionado"
		},
		"AirNomadSmitty" : { 
			"title" : "Programmer",
			"desc"  : "French fry connoisseur"
		},
		"leqphi"         : { 
			"title" : "Designer / Programmer",
			"desc"  : "The quiet type"
		},
		"iphelps"        : {
			"title" : "Programmer",
			"desc"  : "Tab soda enthusiast"
		},
		"stephenmoore56" : {
			"title" : "Database Admin",
			"desc"  : "Bird fanatic"
		},
		"5nahalf"        : {
			"title" : "Programmer",
			"desc"  : "Extreme hoarder"
		},
		"samantha212": {
			"title" : "Programmer",
			"desc"  : "Maybe not Susan?"
		}
	};

	var usersDiv = $('capdig-users');

	new Request.JSONP({
		url       : 'https://api.github.com/orgs/capdig/members',
		data      : {access_token: 'f2e198c12d48167708219ccd6e42f50a1ac79ddd'},
		onComplete: function( response ) {
			Object.each(response.data, function( memberItem ) {
				new Request.JSONP({
					url       : memberItem.url,
					data      : {access_token: 'f2e198c12d48167708219ccd6e42f50a1ac79ddd'},
					onComplete: function( response ) {
						var fig = new Element('figure');

						var img = new Element('img.user-img').set("src", memberItem.avatar_url);
						fig.grab(img);

						var name;
						if( typeof response.data.name != "undefined" ) {
							name = response.data.name
						} else {
							name = "-";
						}

						var cap = new Element('figcaption').set('text', name.split(" ")[0]);
						fig.grab(cap);

						var b = "&nbsp;";
						if( typeof bios[memberItem.login] != "undefined" ) {
							b = "<strong>" + bios[memberItem.login].title + "</strong><br />" + bios[memberItem.login].desc;
						}

						var bio = new Element('p').set('html', b);
						fig.grab(bio);
						
						usersDiv.grab(fig);
					}
				}).send();
			});
		}
	}).send();
});
