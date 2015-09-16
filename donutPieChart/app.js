// fetch data
domo.get('/data/v1/fakePhoneSales')
    .then(function(fakePhoneSales){
      console.log("fakePhoneSales", fakePhoneSales);

      // var salesTotal = 0;
      // for(var i=0; i<fakePhoneSales.length; i++)
      // {
      //   salesTotal+=fakePhoneSales[i].sales;
      // }
      // console.log(salesTotal);
      // var salesArray = new Array(fakePhoneSales.length);
      // for(var i=0; i<fakePhoneSales.length; i++)
      // {
      //   salesArray[i]=fakePhoneSales[i].sales;
      // }
      // var phonesArray = new Array(fakePhoneSales.length);
      // for(var i=0; i<fakePhoneSales.length; i++)
      // {
      //   phonesArray[i]=fakePhoneSales[i].phones;
      // }

//creating donutPieChart svg
      // var svg = d3.selectAll("body")
      // 	.append("svg")
      // 	.append("g")
      //
      // svg.append("g")
      // 	.attr("class", "slices");
      // svg.append("g")
      // 	.attr("class", "labels");
      // svg.append("g")
      // 	.attr("class", "lines");
    var width = 1050,
          height = 800,
      	  radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
        .range(["#DB7093", "#FFEFD5", "#CD853F", "#FFC0CB	", "#FFDAB9", "#DDA0DD", "#BC8F8F", "#D2B48C", "#D8BFD8","#F5DEB3"]);

      var arc = d3.svg.arc()
        .outerRadius(radius-0)
        .innerRadius(radius - 60);

      // var outerArc = d3.svg.arc()
      //   .innerRadius(radius *0.9);
      //   .outerRadius(radius * 0.9);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.sales * 40; });
      var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width/2  + "," + height/2  + ")");

// d3.json("data/v1/fakePhoneSales", function(error, myData){


  // salesArray.forEach(function(d){
  //   d.sales = +d.sales;
  // });
    var g = svg.selectAll(".arc")
        .data(pie(fakePhoneSales))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.sales); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")

        .style("text-anchor", "middle")
        .text(function(d) { return d.data.phone; });
// });

});
