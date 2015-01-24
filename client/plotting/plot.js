Plot = function() {
	var width = undefined;
	var height = 165;
	var padding = 45;
	var x_valuer = Number;
	var y_pos_valuer = Number;
	var y_neg_valuer = Number;
	var y_sum_valuer = Number;
	var onclick_callback = undefined;
	var onmouseover_callback = undefined;
	var onmouseout_callback = undefined;
	var colors = ['#2980B9', '#C0392B', 'green' ];
	var x, y;
	var domain = undefined;
	var svg = undefined;
	var plot = undefined; 
	var data = undefined;

	function chart( selection ) {
            if(svg === undefined) {
            	width = parseInt(selection.style('width'));

            	// We retrieve the current svg attached to the
            	// input "selection" if one exists. Otherwise,
            	// one is created
            	svg = selection
            			.selectAll("svg")
            			.data([ 0 ])
            			.enter()
            			.append( 'svg' );

            	svg.attr( 'width' ,  width).attr( 'height' , height);

            	plot = svg.append("g").attr('id', 'sentimentplot');

            	var pos = plot.append('g').attr('id', 'pos');
            	var neg = plot.append('g').attr('id', 'neg');
            	var neu = plot.append('g').attr('id', 'neu');

            	pos.append('path');
            	pos.append('g').attr('id', 'selection');

            	neg.append('path');
            	neg.append('g').attr('id', 'selection');

            	neu.append('path');
            	neu.append('g').attr('id', 'selection');

            	svg.append('g').attr('id', 'axis');

            	// drawBox( svg );
            }
	}

	function update( ) {
		if(data === undefined || data.length === 0)
			return;

		x = d3.time
			.scale()
			.range( [ 35 , width-padding ] )
			.domain( domain );

		y = d3.scale
			.linear()
			.range( [ height - 10, 10 ] )
			.domain( [-1, 1] );

		plotCurves(plot.select('#pos').select('path'), data, y_pos_valuer, colors[0], 0.5);
		plotCurves(plot.select('#neg').select('path'), data, y_neg_valuer, colors[1], 0.5);    
		// plotCurves(plot.select('#neu').select('path'), data, y_sum_valuer, 'darkgreen', 0.5);    
		
		selectionHandler(plot.select('#pos').select('#selection'), data, y_pos_valuer, colors[0]);
		selectionHandler(plot.select('#neg').select('#selection'), data, y_neg_valuer, colors[1]);

		renderAxis(svg.select('#axis'));
	}

	function drawBox( selection ) {
		selection
			.append('rect')
			.attr('fill', 'none')
			.attr('stroke', 'black')
			.attr('stroke-width', 0.5)
			.attr('x', 0 )
			.attr('y', 0 )
			.attr('width', width)
			.attr('height', height);
	}

	function plotCurves( plot, data, y_valuer, color, opacity ) {
		if( data !== undefined ) {
			var curves = plot.selectAll("line").data( data );
			curves.exit().remove();
			curves.enter().append("line");
			var x_0 = 0;
			var y_0 = 0;
			curves
				.attr('fill', "none")
				.attr('stroke-width', "2px")
				.attr('fill-opacity', 0.8)
				.attr("x1", function( d ) { var a = Number( x_0 ); x_0 = x( x_valuer.call( this, d ) ); return a; })
				.attr("y1", function( d ) { var a = Number( y_0 ); y_0 = y( y_valuer.call( this, d ) ); return a; })
				.attr("x2", function( d ) { return x( x_valuer.call( this, d ) )})
				.attr("y2", function( d ) { return y( y_valuer.call( this, d ) )})
				.attr('stroke', function( d, idx ) {  return ( idx == 0 ) ? "none" : color; } );

			// var area = d3.svg.area()
			// 	.interpolate("linear")
			// 	.x( function(d) { return x( x_valuer.call(this, d) ); } )
			// 	.y0( 0.5 * height )
			// 	.y1( function(d) { return y( y_valuer.call(this, d) ); } );
			// plot
			// 	.attr('fill', "none")
			// 	.attr('stroke', color)
			// 	.attr('stroke-width', "2px")
			// 	.attr('fill-opacity', 0.8)
			// 	.attr('d', area(data));
		}
	}

	function drawCircles( selection, data, y_valuer, color ) {
		selection.attr('id', function( v, idx ) { return 'circle-id-' + idx } )
			.attr('cx', function( v, idx ) { return x( x_valuer.call(this, v, idx)); } )
			.attr('cy', function( v, idx ) { return y( y_valuer.call(this, v, idx)); } )
			.attr('r', 7)
			.attr('fill', color );
	}

	function drawRects( selection, data, y_valuer, color ) {
		var bar_width = Math.ceil( x( x_valuer.call( this, data[1], 1 ) ) - x( x_valuer.call( this, data[0], 0 ) ) ) + 1;
		selection
			.attr('fill', 'white')
			.attr('fill-opacity', 0.0)
			.attr('x', function( v, idx ) { return x( x_valuer.call(this, v, idx) ); } )
			.attr('y', ( ( (y_valuer.grade === 'pos') ? 0 : 0.5 * height ) ) )
			.attr('width', bar_width)
			.attr('height', 0.5 * height)
			.attr('cursor', 'pointer')
			.on('click', function(datum, idx) {
			})
			.on('mouseover', function(datum, idx) { 
				d3.select(this.parentNode).select('#circle-id-' + idx).attr('fill-opacity', 1.0);
				if(onclick_callback !== undefined) onclick_callback.call(this, datum, idx);
				var position = $(this).offset().left;
				if(onmouseover_callback !== undefined) onmouseover_callback.call(this, position );
			})
			.on('mouseout', function(datum, idx) { 
				d3.select(this.parentNode).select('#circle-id-' + idx).attr('fill-opacity', 0.0);
				if(onmouseout_callback !== undefined) onmouseout_callback.call(this, x( x_valuer.call(this, datum, idx) ) );
			});
	}

	function selectionHandler( selection, data, y_valuer, color ) {
		var circles = selection.selectAll('circle').data(data);
		circles.exit().remove();
		drawCircles( circles.enter().append('circle').attr('fill-opacity', 0.0 ), data, y_valuer, color );
		drawCircles( circles, data, y_valuer, color );

		var rects = selection.selectAll( 'rect' ).data( data );
		rects.exit().remove();
		drawRects( rects.enter().append('rect'), data, y_valuer, color );
		drawRects( rects, data, y_valuer, color );
	}

        function renderAxis(cell) {

        	cell.select('#axis_text').remove();
            var axis = cell.append('g')
			.attr('id', 'axis_text')
			.attr('pointer-events', 'none')
			.attr('transform', 'translate(' + 0 + ',' + 0 + ')');

            // PLOT TEXT: LIKE
            axis.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                .attr("font-size", 20)
                .attr("fill", colors[0])
                .attr("transform", "translate(" + (10) + "," + (height * 0.48) + ")" + "rotate(-90)")
                .text(i18n("like"));

            // PLOT TEXT: DISLIKE
            axis.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                .attr("font-size", 20)
                .attr("fill", colors[1])
                .attr("transform", "translate(" + (10) + "," + (height*0.52) + ")" + "rotate(90)")
                .text(i18n("dislike"));

            // x.range( [ padding , width ] );
            axis.append('g')
                 .attr('transform', 'translate(' + 0 + ',' + height / 2 + ')')
                 .attr('fill', 'lightgray')
                 .call(d3.svg.axis().ticks([8]).scale(x).orient("bottom"))
                 .selectAll('text')
                 .attr('stroke', 'white')
                 .attr('stroke-width', 3)
                 .attr('stroke-opacity', 0.5)
                 .attr('fill', 'white')
                 .attr('pointer-events', 'none')
                 .each(function() { d3.select(this).text( forceLocalization( d3.select(this).text() ) ); });
            axis.append('g')
                 .attr('transform', 'translate(' + 0 + ',' + height / 2 + ')')
                 .attr('fill', 'lightgray')
                 .call(d3.svg.axis().ticks([8]).scale(x).orient("bottom"))
                 .selectAll('text')
                 .attr('fill', 'black')
                 .attr('pointer-events', 'none')
                 .each(function() { d3.select(this).text( forceLocalization( d3.select(this).text() ) ); });

	}

	chart.x = function(_) {
		if( !arguments.length )
			return x_valuer;
		x_valuer = _;
		return chart;
	}

	chart.yPos = function(_) {
		if( !arguments.length )
			return y_pos_valuer;
		y_pos_valuer = _;
		y_pos_valuer.grade = 'pos';
		return chart;
	}

	chart.yNeg = function(_) {
		if( !arguments.length )
			return y_neg_valuer;
		y_neg_valuer = _;
		y_neg_valuer.grade = 'neg';
		return chart;
	}

	chart.y = function(_) {
		if( !arguments.length )
			return y_sum_valuer;
		y_sum_valuer = _;
		return chart;
	}

	chart.domain = function(_) {
		if( !arguments.length)
			return domain;
		domain = _;
		return chart;
	}

	chart.onclick = function(_) {
		if( !arguments.length)
			return onclick_callback;
		onclick_callback = _;
		return chart;
	}

	chart.onmouseover = function(_) {
		if(!arguments.length)
			return onmouseover_callback;
		onmouseover_callback = _;
		return chart;
	}

	chart.onmouseout = function(_) {
		if(!arguments.length)
			return onmouseout_callback;
		onmouseout_callback = _;
		return chart;
	}

	chart.data = function( _ ) {
		if (!arguments.length)
			return _;
		data = _;
		return chart;
	}

	chart.update = function() {
		update();
		return chart;
	}
    return chart;
}