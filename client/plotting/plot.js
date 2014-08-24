Plot = function() {
	var width = undefined;
	var height = 300;
	var padding = 45;
	var x_valuer = Number;
	var y_pos_valuer = Number;
	var y_neg_valuer = Number;
	var y_sum_valuer = Number;
	var onclick_callback = undefined;
	var colors = ['#2980B9', '#C0392B', 'green' ];
	var x, y;
	var domain = undefined;
	var plot = undefined; 
	var data = undefined;

	var months_abbreviated_en	= [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var months_abbreviated_pt 	= [ 'Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
	var months_full_en    			= [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var months_full_pt				= [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	var weekday_abbreviated_en	= [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
	var weekday_abbreviated_pt	= [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom' ];

	function forceLocalization(text) {
		if(configGetLanguage() !== 'pt-br')
			return text;

		for(var i = 0; i < months_full_en.length; ++i) {
			var replaced = text.replace(months_full_en[i], months_full_pt[i]);
			if(replaced === text)
				continue;
			return replaced;
		}
		for(var i = 0; i < months_abbreviated_en.length; ++i) {
			var replaced = text.replace(months_abbreviated_en[i], months_abbreviated_pt[i]);
			if(replaced === text)
				continue;
			return replaced;
		}
		for(var i = 0; i < weekday_abbreviated_en.length; ++i) {
			var replaced = text.replace(weekday_abbreviated_en[i], weekday_abbreviated_pt[i]);
			if(replaced === text)
				continue;
			return replaced;
		}
		return text;
	}

	function chart( selection ) {
            if(plot == undefined) {
            	width = parseInt(selection.style('width'));
            	plot = selection.append( 'svg' );
            	plot.attr( 'width' ,  width-padding).attr( 'height' , height);
            	plot = plot.append("g").attr('id', 'sentimentplot');

            	var pos = plot.append('g').attr('id', 'pos');
            	var neg = plot.append('g').attr('id', 'neg');

            	pos.append('path');
            	pos.append('g').attr('id', 'selection');

            	neg.append('path');
            	neg.append('g').attr('id', 'selection');
            }
	}

	function update( ) {
		x = d3.time
			.scale()
			.range( [ 2*padding , width ] )
			.domain( domain );

		y = d3.scale
			.linear()
			.range( [ height, 0 ] )
			.domain( [-1, 1] );

		plotCurves(plot.select('#pos').select('path'), data, y_pos_valuer, colors[0], 0.5);
		plotCurves(plot.select('#neg').select('path'), data, y_neg_valuer, colors[1], 0.5);    
		
		selectionHandler(plot.select('#pos').select('#selection'), data, y_pos_valuer, colors[0]);
		selectionHandler(plot.select('#neg').select('#selection'), data, y_neg_valuer, colors[1]);

		// render_axis(plot, data);
	}

	function plotCurves( plot, data, y_valuer, color, opacity ) {
		if( data !== undefined ) {
			var area = d3.svg.area()
				.interpolate("linear")
				.x( function(d) { return x( x_valuer.call(this, d) ); } )
				.y0( 0.5 * height )
				.y1( function(d) { return y( y_valuer.call(this, d) ); } );
			plot
				.attr('fill', color)
				.attr('fill-opacity', 1.0)
				.attr('d', area(data));
		}
	}

	function drawCircles( selection, data, y_valuer, color ) {
		var bar_width = Math.floor( x( x_valuer.call( this, data[1], 1 ) ) - x( x_valuer.call( this, data[0], 0 ) ) );
		selection.attr('id', function( v, idx ) { return idx } )
			.attr('cx', function( v, idx ) { return x( x_valuer.call(this, v, idx)); } )
			.attr('cy', function( v, idx ) { return y( y_valuer.call(this, v, idx)); } )
			.attr('r', bar_width*0.5 )
			.attr('fill', color );
	}

	function drawRects( selection, data, y_valuer, color ) {
		var bar_width = Math.ceil( x( x_valuer.call( this, data[1], 1 ) ) - x( x_valuer.call( this, data[0], 0 ) ) ) + 1;
		selection
			.attr('fill', 'white')
			.attr('fill-opacity', 0.0)
			.attr('x', function( v, idx ) { return x( x_valuer.call(this, v, idx) ); } )
			.attr('y', 0 )
			.attr('width', bar_width)
			.attr('height', height)
			.on('click', function(datum, idx) {
				if(onclick_callback !== undefined)
					onclick_callback.call(this, datum, idx);
			})
			.attr('cursor', 'pointer')
			.on('mouseover', function(datum, idx) { 
				d3.select(this.parentNode).select('circle') .attr('fill-opacity', 1.0);
			})
			.on('mouseout', function(datum, idx) { 
				d3.select(this.parentNode).select('circle') .attr('fill-opacity', 0.0);
			});
	}

	function selectionHandler( selection, data, y_valuer, color ) {
		
		var circles = selection.selectAll('circle').data(data);
		
		circles.exit().remove();
		drawCircles( circles.enter().append('circle'), data, y_valuer, color );
		drawCircles( circles, data, y_valuer, color );

		var rects = selection.selectAll( 'rect' ).data( data );
		rects.exit().remove();
		drawRects( rects.enter().append('rect'), data, y_valuer, color );
		drawRects( rects, data, y_valuer, color );
	}

        function render_axis(cell) {

            var axis = cell.append('g')
                                    .attr('transform', 'translate(' + padding + ',' + 0 + ')');
                                    // .append('line')
                                    // .attr('x1', 0.0)
                                    // .attr('y1', 0.0)
                                    // .attr('x2', 0.0)
                                    // .attr('y2', height)
                                    // .attr('stroke', 'lightgray')
                                    // .attr('stroke-width', '3px');

            // PLOT TEXT: SENTIMENT
            // cell.append("text")
            //     .attr("text-anchor", "start")
            //     .attr("y", 6)
            //     // .attr("dy", ".75em")
            //     .attr("font-size", 35)
            //     .attr("transform", "translate(" + (padding-25) + "," + (height*0.75) + ")" + "rotate(-90)")
            //     .text(i18n("sentiment"));

            // PLOT TEXT: LIKE
            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                .attr("font-size", 30)
                .attr("fill", colors[0])
                .attr("transform", "translate(" + (0) + "," + (height * 0.45) + ")" + "rotate(0)")
                .text(i18n("like"));

            // PLOT TEXT: DISLIKE
            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                .attr("font-size", 30)
                .attr("fill", colors[1])
                .attr("transform", "translate(" + (0) + "," + (height*0.60) + ")" + "rotate(0)")
                .text(i18n("dislike"));

            // x.range( [ padding , width ] );
            cell.append('g')
                 .attr('transform', 'translate(' + 0 + ',' + height / 2 + ')')
                 .attr('fill', 'lightgray')
                 .call(d3.svg.axis().scale(x).orient("bottom"))
                 .selectAll('text')
                 .attr('fill', 'black')
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
		return chart;
	}

	chart.yNeg = function(_) {
		if( !arguments.length )
			return y_neg_valuer;
		y_neg_valuer = _;
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