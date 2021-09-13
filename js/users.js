document.addEventListener('DOMContentLoaded', () => {
	const bios = {
		"donatj"        : {
			"title": "Programmer",
			"desc" : "Keyboard collector"
		},
		"henderjon"     : {
			"title": "Lead Programmer",
			"desc" : "Half beard, all man"
		},
		"oranj"         : {
			"title": "Programmer",
			"desc" : "Fire giant"
		},
		"phanzink"      : {
			"title": "Programmer",
			"desc" : "Headphone aficionado"
		},
		"AirNomadSmitty": {
			"title": "Programmer",
			"desc" : "French fry connoisseur"
		},
		"leqphi"        : {
			"title": "Designer / Programmer",
			"desc" : "The quiet type"
		},
		"iphelps"       : {
			"title": "Programmer",
			"desc" : "Tab soda enthusiast"
		},
		"stephenmoore56": {
			"title": "Database Admin",
			"desc" : "Bird fanatic"
		},
		"5nahalf"       : {
			"title": "Programmer",
			"desc" : "Extreme hoarder"
		},
		"samantha212"   : {
			"title": "Programmer",
			"desc" : "Maybe not Susan?"
		}
	};

	const usersDiv = document.getElementById('capdig-users');

	fetch("https://api.github.com/orgs/capdig/members", {
		"method" : "GET",
		"headers": {}
	})
		.then(response => response.json())
		.then(( data ) => {
			for( const memberItem of data ) {
				console.log(memberItem);

				fetch(memberItem.url, {
					"method" : "GET",
					"headers": {}
				})
					.then(response => response.json())
					.then(( response ) => {
						var fig = new Element('figure');

						var img = new Element('img.user-img').set("src", memberItem.avatar_url);
						fig.grab(img);

						var name;
						if( typeof response.name != "undefined" ) {
							name = response.name
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
					})
					.catch(console.error.bind(console));
			}
		})
		.catch(console.error.bind(console));
});
