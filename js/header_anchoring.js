
function header_anchoring( search_selector, injection_selector, max_depth ) {

	if( typeof "".repeat == "undefined" ) {
		String.prototype.repeat = function( num ) {
			return new Array( num + 1 ).join( this );
		}
	}

	var output = '';
	var i = 0;

	var last_hv = 0;
	$$(search_selector)[0].getElements('h1,h2,h3,h4,h5,h6,h7,h8').each(function(e,i) {
		var tag = e.get('tag');
		var hv  = parseInt( /^h(\d+)/gi.exec(tag)[1], 10);
		var hv_diff = hv - last_hv;

		if(hv > max_depth) {
			return;
		}

		if( hv_diff > 0 ) {
			output += '<ul>'.repeat( hv_diff );
		}else if( hv_diff < 0 ){
			output += '</ul>'.repeat( 0 - hv_diff );
		}

		var id
		if( !(id = e.get('id')) ) {
			id   = 'hqlink-' + i;
		}
		
		var href = location.protocol + '//' + location.host + location.pathname + '#' + id
		var a    = new Element('a.quicklink').set('href', href);
		a.set('text', e.get('text'));

		output += '<li>' + a.outerHTML + '</li>';

		last_hv = hv;
		i++;
	});

	output += '</ul>'.repeat( last_hv );
	
	$$(injection_selector).set('html', output);

};