Plot = function( ) {
    var width = undefined;
    var height = 300;
    var padding = 60;
    var x_valuer = undefined;
    var y_valuer = undefined;
    var colors = ['#2980B9', '#C0392B', 'darkgreen', 'yellow'];
    var x, y
    var domain = undefined;
    var pplot = undefined;
    
    function chart( selection ) {

        selection.each( function( data, idx ) {  
        
            if( width == undefined )
                width = parseInt(selection.style('width'));

            var svg = selection.selectAll("svg").data([data]);
            if(pplot == undefined)
                pplot = svg.enter()
                            .append( 'svg' )
                            .attr( 'width' ,  width)
                            .attr( 'height' , height);
            pplot.select('#sentimentplot').remove();
            var plot = pplot.append("g")
                            .attr('id', 'sentimentplot');
            

            x = d3.scale
                    .linear()
                    .range( [ padding , width ] )
                    .domain( domain );

            y = d3.scale
                        .linear()
                        .range( [ height-10, 10 ] )
                        .domain( [-1, 1] );
            
            var line = d3.svg.line()
                .interpolate('linear') 
                .x( function( v ) { return x( x_valuer(v) ); } )
                .y( function( v ) { return y( y_valuer(v) ); } );

            for(var i = 0; i < data.length; ++i) {
                plot
                    .append( 'path' )
                    .attr( 'stroke', colors[i] )
                    .attr( 'stroke-width', '5px' )
                    .attr( 'fill', 'none')
                    .attr( 'd', line(data[i].slice(idx)) );
            }

            render_axis(plot, data);

        });

        function render_axis(cell, data) {
            
            cell
                .append('g')
                .attr('transform', 'translate(' + padding + ',' + height / 2 + ')')
                .append('rect')
                .attr('fill', 'lightgray')
                .attr('width', width-padding)
                .attr('height', 2);

            var axis = cell.append('g')
                                    .attr('transform', 'translate(' + padding + ',' + 0 + ')')  
                                    .append('line')
                                    .attr('x1', 0.0)
                                    .attr('y1', 0.0)
                                    .attr('x2', 0.0)
                                    .attr('y2', height)
                                    .attr('stroke', 'lightgray')
                                    .attr('stroke-width', '3px')
            
            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                // .attr("dy", ".75em")
                .attr("font-size", 35)
                .attr("transform", "translate(" + (padding-25) + "," + (height*0.75) + ")" + "rotate(-90)")
                .text("Sentiment");

            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                // .attr("dy", ".75em")
                .attr("font-size", 35)
                .attr("transform", "translate(" + (padding+10) + "," + (20) + ")" + "rotate(0)")
                .text("Like");

            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                // .attr("dy", ".75em")
                .attr("font-size", 35)
                .attr("transform", "translate(" + (padding+10) + "," + (height-15) + ")" + "rotate(0)")
                .text("Dislike");
        }
    }

    chart.width = function( _ ) {
        if ( !arguments.length ) 
            return width;
        width = _;
        return chart;
    };

    chart.x = function(_) {
        if( !arguments.length )
            return x_valuer;
        x_valuer = _;
        return chart;
    }

    chart.y = function(_) {
        if( !arguments.length )
            return y_valuer;
        y_valuer = _;
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