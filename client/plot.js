Plot = function( ) {
    var width = undefined;
    var height = 300;
    var padding = 60;
    var valuer = Number;
    var brush;
    var colors = ['#2980B9', '#C0392B'];
    var x, y
    var pplot = undefined;
    
    function chart( selection ) {

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
                                    .attr('font-size', 25)
                                    .call(d3.svg.axis().scale(y).orient('right'));
            axis
                .selectAll('.domain')
                .attr('stroke', 'lightgray')
                .attr('stroke-width', '3px')
                .attr('fill', 'none');

            axis
                .selectAll('text')
                .style('text-anchor', 'start')
                .attr('transform', 'translate(' + 0 + ',' + 0 + ')rotate(0)')
                .attr('stroke', 'white');   

            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                // .attr("dy", ".75em")
                .attr("font-size", 35)
                .attr("transform", "translate(" + (padding-25) + "," + (height-120) + ")" + "rotate(-90)")
                .text("Sentiment");

            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                // .attr("dy", ".75em")
                .attr("font-size", 35)
                .attr("transform", "translate(" + (2*padding) + "," + (20) + ")" + "rotate(0)")
                .text("Positive");

            cell.append("text")
                .attr("text-anchor", "start")
                .attr("y", 6)
                // .attr("dy", ".75em")
                .attr("font-size", 35)
                .attr("transform", "translate(" + (2*padding) + "," + (height-15) + ")" + "rotate(0)")
                .text("Negative");
        }

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
            

            var now = new Date();
            var past = new Date() ;
            past.setSeconds(past.getSeconds()-50);
            var domain = [past, now];

            x = d3.time
                        .scale()
                        .range( [ padding , width ] )
                        .domain( domain );

            y = d3.scale
                        .linear()
                        .range( [ height-10, 10 ] )
                        .domain( [-1, 1] );
            
            var line = d3.svg.line()
                .interpolate('basis') 
                .x( function( v ) { return x(v.date); } )
                .y( function( v ) { return y(v.sentiment); } );

            for(var i = 0; i < data.length; ++i) {
                var idx = 0;
                while(data[i][idx].date.valueOf() < past.valueOf()) idx++;
                plot
                    .append( 'path' )
                    .attr( 'stroke', colors[i] )
                    .attr( 'stroke-width', '5px' )
                    .attr( 'fill', 'none')
                    .attr( 'd', line(data[i].slice(idx)) );
            }

            render_axis(plot, data);

        });
    }

    chart.width = function( _ ) {
        if ( !arguments.length ) 
            return width;
        width = _;
        return chart;
    };

    chart.value = function(_) {
        if( !arguments.length )
            return valuer;
        valuer = _;
        return chart;
    }

    return chart;
}