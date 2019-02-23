var margin = {top: 20, right: 30, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var lineGenmono = d3.svg.line()
    .x(function(d) {
        return x(d.letter) + x.rangeBand() / 2;
    })
    .y(function(d) {
        return y(d.frequency);
    })
    .interpolate("monotone");

var lineGencur = d3.svg.line()
    .x(function(d) {
        return x(d.letter) + x.rangeBand() / 2;
    })
    .y(function(d) {
        return y(d.frequency);
    })
    .interpolate("basis");

var svg = d3.select("#bar-chart").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/data/d3demo/bar-chart.json", function(error, data) {
    if (error) throw error;
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of Years");
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", height)
        .attr("height", 0)
        .transition()
        .duration(500)
        .delay(function(d, i){return 100 * i})
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });

    var path1 = svg.append("path")
        .attr("d", lineGenmono(data))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    var totalLength1 = path1.node().getTotalLength();
    path1.attr("stroke-dasharray", totalLength1 + " " + totalLength1)
        .attr("stroke-dashoffset", totalLength1)
        .transition()
        .delay(500)
        .duration(4000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

    var path2 = svg.append("path")
        .attr("d", lineGencur(data))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    var totalLength2 = path2.node().getTotalLength();
    path2.attr("stroke-dasharray", totalLength2 + " " + totalLength2)
        .attr("stroke-dashoffset", totalLength2)
        .transition()
        .delay(500)
        .duration(4000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

    svg.selectAll(".barNum")
        .data(data)
        .enter().append("text")
        .attr("class", "barNum")
        .attr("x", function(d) { return x(d.letter) + x.rangeBand() / 2; })
        .attr("y", function(d) { return y(d.frequency) - 20; })
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text(function (d, i) {return data[i].frequency;});
});

function type(d) {
    d.frequency = +d.frequency;
    return d;
}