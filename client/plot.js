Plot = function() {
    var width = undefined;
    var height = 300;
    var padding = 45;
    var x_valuer = Number;
    var y_pos_valuer = Number;
    var y_neg_valuer = Number;
    var y_sum_valuer = Number;
    var colors = ['#2980B9', '#C0392B', 'green' ];
    var x, y;
    var domain = undefined;
    var pplot = undefined; 

    var months_abbreviated_en	= [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var months_abbreviated_pt 	= [ 'Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var months_full_en    	= [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var months_full_pt       	= [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var weekday_abbreviated_en= [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
    var weekday_abbreviated_pt= [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom' ];

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

        selection.each( function( data, idx ) {  

            width = parseInt(selection.style('width'));
            if(pplot == undefined)
                pplot = selection.append( 'svg' );
            pplot.attr( 'width' ,  width-padding).attr( 'height' , height);
            pplot.select('#sentimentplot').remove();
            var plot = pplot.append("g").attr('id', 'sentimentplot');

            x = d3.time
                    .scale()
                    .range( [ padding , width ] )
                    .domain( domain );

    		y = d3.scale
    			.linear()
    			.range( [ height-10, 10 ] )
    			.domain( [-1, 1] );
            
            plotCurves(plot, data, y_pos_valuer, colors[0], 0.5);
            plotCurves(plot, data, y_neg_valuer, colors[1], 0.5);    
            // plotCurves(plot, data, y_sum_valuer, colors[2], 0.9);

    		render_axis(plot, data);
        });

        function plotCurves( plot, data, y_valuer, color, opacity ) {
            var line = d3.svg.area()
                        .interpolate('basis') 
                        .x( function( v, idx ) { return x( x_valuer.call(this, v, idx) ); })
                        .y0( 0.5 * height )
                        .y1( function( v, idx ) { return y( y_valuer.call(this, v, idx) ); });

            if( data !== undefined )
                plot.append( 'path' )
                    .attr( 'stroke', color)
                    .attr( 'stroke-width', '1px' )
                    .attr( 'fill', color)
                    .attr( 'fill-opacity', opacity)
                    .attr( 'd', line( data ) );
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
                .attr("transform", "translate(" + (width * 0.4) + "," + (20) + ")" + "rotate(0)")
                .text(i18n("like"));

            // PLOT TEXT: DISLIKE
            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                .attr("font-size", 30)
                .attr("fill", colors[1])
                .attr("transform", "translate(" + (width * 0.4) + "," + (height-15) + ")" + "rotate(0)")
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

    return chart;
}