define([], function() {
  var chart = d3.select("body .container").append("svg")
        .attr("class", "chart");

  function poll() {
    url = 'http://192.168.2.2:8080/key/server.ks3265738.realtime.cpu.iowait'
    console.log('running');
    $.when(
       $.ajax({
        url: url,
        dataType: 'jsonp',
    })
       ).then(function(data){

        var w = 2,
        h = 200;

        var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, w]);

        var y = d3.scale.linear()
        .domain([0, 100])
        .rangeRound([0, h]);

        var chart = d3.select("svg.chart")
        .attr("width", w * data.length - 1)
        .attr("height", h);


        chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d, i) { return x(i) - .5; })
        .attr("y", function(d) { return h - y(d) - .5; })
        .attr("width", w)
        .attr("height", function(d) { return y(d); });

        chart.selectAll("rect")
        .data(data)
        .transition()
         .duration(10)
         .attr("height", function(d) { return y(d); })
         .attr("y", function(d) { return h - y(d) - .5; });

    });
       setTimeout(poll,500);
   }


   poll();

});