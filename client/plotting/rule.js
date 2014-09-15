Ruler = function() {
	var svg = undefined;
	var width = undefined;
	var height = undefined;
	var rule = undefined;
	function chart( selection ) {
            if(svg === undefined) {
            	width = parseInt(selection.style('width'));
            	height = parseInt(selection.style('height'));
            	svg = selection.append( 'svg' );
			svg.attr( 'width' ,  '100%').attr( 'height' , '100%');
            	rule = svg.append('g').append('rect');
			rule.attr('fill', 'none')
				.attr('stroke', 'black')
				.attr('stroke-width', 0.5)
				.attr('x', 0 )
				.attr('y', 0 )
				.attr('width', '100%')
				.attr('height', '100%');
            }
	}

	chart.width = function( _ ) {
		svg.attr('width', _);
		return chart;
	}

	chart.height = function( _ ) {
		svg.attr('height', _);
		return chart;
	}

	chart.x = function( _ ) {
		rule.attr('x', _ );
		return chart;
	}

	return chart;
}