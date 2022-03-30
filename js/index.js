$.getJSON("/partial-covid-data.json", function(data) {
  

  // get list of countries

  countries = [];
 
  var i;
  for(i = 0; i < data.length; i++){
    if(countries.includes(data[i].Country) == false){
      countries.push(data[i].Country);
    }

    // there are 186 different countries in this dataset
    
  }

  
  var strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%SZ"); // convert date string to date object

  var dates = [];
  var domain = [strictIsoParse("2020-01-01T00:00:00Z"),strictIsoParse("2020-06-01T00:00:00Z")]; // anticipated range of date axis
  
  
  
  var countries_list = countries; 
  
  
  for (let obj of data) {
    dates.push(strictIsoParse(obj.Date));
  }
  
  var height = 15500;
  var width = 1500;
  
  
  // append svg
  var svg = d3.select('#svg-container') // select the container
    .append('svg') // append it with an svg
    .attr("width", width) // specify width of svg
    .attr("height", height) // specify height of svg
    .attr("transform", "translate(100, 0)");
  


    
  // X Axis
  var xscale = d3.scaleTime() // create scale 
    .domain(domain)
    .range([25, width - 500]);
  
  var x_axis = d3.axisTop() // Add scales to axis
    .scale(xscale);
  
  svg.append("g") //Append group and insert axis
    .attr("transform", "translate(200, 75)")
    .attr("id","xaxis")
    .call(x_axis);
  
  // Y Axis
  var yscale = d3.scaleBand()
    .domain(countries_list)
    .range([0,15000]);
  
  var y_axis = d3.axisLeft()
    .scale(yscale);


  svg.append("g") //Append group and insert axis
    .attr("transform", "translate(200, 100)")
    .call(y_axis)
    
  // Z Axis
  var z = d3.scaleSqrt()
  .domain([0, 1551853])
  .range([ 1, 60]);
  


  // Draw Circles, Confirmed 
  svg.selectAll("#circleconfirmed")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d)=> z(d.Confirmed))
      .attr("fill", function(d) {
        if (d.Confirmed != 0){
          return "Black";
        }else{
          return "none";}     
      })
      .attr("cx", (d) => xscale(strictIsoParse(d.Date)))
      .attr("cy", (d)=> yscale(d.Country))
      .attr("transform", "translate(200,140)");


  
  // Draw Circles, Recovered
  svg.selectAll("#circlerecovered")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d)=> z(d.Recovered))
      .attr("fill", function(d) {
        if (d.Confirmed != 0){
          return "green";
        }else{
          return "none";}     
      })
      .attr("cx", (d) => xscale(strictIsoParse(d.Date)))
      .attr("cy", (d)=> yscale(d.Country))
      .attr("transform", "translate(200,140)");

  
 

  // Draw Circles, Active
  svg.selectAll("#circleactive")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d)=> z(d.Active))
      .attr("fill", function(d) {
        if (d.Confirmed != 0){
          return "orange";
        }else{
          return "none";}     
      })
      .attr("cx", (d) => xscale(strictIsoParse(d.Date)))
      .attr("cy", (d)=> yscale(d.Country))
      .attr("transform", "translate(200,140)")
      .attr("opacity", 0.5);

 // Draw Circles, Deaths
 svg.selectAll("#circledeaths")
 .data(data)
 .enter()
 .append("circle")
 .attr("r", (d)=> z(d.Deaths))
 .attr("fill", function(d) {
   if (d.Confirmed != 0){
     return "red";
   }else{
     return "none";}     
 })
 .attr("cx", (d) => xscale(strictIsoParse(d.Date)))
 .attr("cy", (d)=> yscale(d.Country))
 .attr("transform", "translate(200,140)");
 

});


