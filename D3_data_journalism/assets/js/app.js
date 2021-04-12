// @TODO: YOUR CODE HERE!

// // svg container
// var svgHeight = 500;
// var svgWidth = 1000;

// // margins
// var margin = {
//   top: 50,
//   right: 50,
//   bottom: 50,
//   left: 50
// };

// // chart area minus margins
// var chartHeight = svgHeight - margin.top - margin.bottom;
// var chartWidth = svgWidth - margin.left - margin.right;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//     .select("#scatter")
//     .append("svg")
//     .attr("height", svgHeight)
//     .attr("width", svgWidth);

// // Append an SVG group
// // shift everything over by the margins
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // scale y to chart height
// var yScale = d3.scaleLinear()
//   .domain([0, d3.max(dataArray)])
//   .range([chartHeight, 0]);

// // scale x to chart width
// var xScale = d3.scaleBand()
//   .domain(dataCategories)
//   .range([0, chartWidth])
//   .padding(0.05);

// // create axes
// var yAxis = d3.axisLeft(yScale);
// var xAxis = d3.axisBottom(xScale);

// // set x to the bottom of the chart
// chartGroup.append("g")
//   .attr("transform", `translate(0, ${chartHeight})`)
//   .call(xAxis);

// // set y to the y axis
// // This syntax allows us to call the axis function
// // and pass in the selector without breaking the chaining
// chartGroup.append("g")
//   .call(yAxis);



// // Create circles 
// var circles = svg.selectAll("circle");

// var rValues = [40, 25, 10];

// circles.data(rValues)
//     .enter()
//     .append("circle")
//     .attr("cx", 50)
//     .attr("cy", 50)
//     .attr("r", function(d) {
//       return d;
//     })
//     .attr("stroke", "black")
//     .attr("stroke-width", "5")
//     .attr("fill", "red");

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(dataDemo, err) {
    if (err) throw err;
    console.log(dataDemo)

    // // parse data using forEach (must create empy array to append data to array)
    // var states=[]
    // var poverty=[]
    // var age=[]
    // var income=[]
    // var healthcare=[]
    // var obesity=[]
    // var smokes=[]
    // dataDemo.forEach(function(data) {
    //     // var state=+data.map(state_key=>state_key.state)
    //     // console.log(state)
    //     states.push(data.state);
    //     poverty.push(data.poverty);
    //     age.push(data.age);
    //     income.push(data.income);
    //     healthcare.push(data.healthcare);
    //     obesity.push(data.obesity);
    //     smokes.push(data.smokes);
      
    // });
    // console.log(states)
    // console.log(poverty)
    // console.log(age)
    // console.log(income)
    // console.log(healthcare)
    // console.log(obesity)
    // console.log(smokes)

    // parse data using .map(), cannot use {} around data.zzz for .map()
    var states=dataDemo.map(data=>data.state);
    var poverty=dataDemo.map(data=>+data.poverty);
    var age=dataDemo.map(data=>+data.age);
    var income=dataDemo.map(data=>+data.income);
    var healthcare=dataDemo.map(data=>+data.healthcare);
    var obesity=dataDemo.map(data=>+data.obesity);
    var smokes=dataDemo.map(data=>+data.smokes);
    console.log("states",states);
    console.log("poverty",poverty)
    console.log("age",age)
    console.log("income",income)
    console.log("healthcare",healthcare)
    console.log("obesity",obesity)
    console.log("smokes",smokes)

  
    // // xLinearScale function above csv import
    // var xLinearScale = xScale(hairData, chosenXAxis);
  
    // // Create y scale function
    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(hairData, d => d.num_hits)])
    //   .range([height, 0]);
  
    // // Create initial axis functions
    // var bottomAxis = d3.axisBottom(xLinearScale);
    // var leftAxis = d3.axisLeft(yLinearScale);
  
    // // append x axis
    // var xAxis = chartGroup.append("g")
    //   .classed("x-axis", true)
    //   .attr("transform", `translate(0, ${height})`)
    //   .call(bottomAxis);
  
    // // append y axis
    // chartGroup.append("g")
    //   .call(leftAxis);
  
    // // append initial circles
    // var circlesGroup = chartGroup.selectAll("circle")
    //   .data(hairData)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //   .attr("cy", d => yLinearScale(d.num_hits))
    //   .attr("r", 20)
    //   .attr("fill", "pink")
    //   .attr("opacity", ".5");
  
    // // Create group for two x-axis labels
    // var labelsGroup = chartGroup.append("g")
    //   .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    // var hairLengthLabel = labelsGroup.append("text")
    //   .attr("x", 0)
    //   .attr("y", 20)
    //   .attr("value", "hair_length") // value to grab for event listener
    //   .classed("active", true)
    //   .text("Hair Metal Ban Hair Length (inches)");
  
    // var albumsLabel = labelsGroup.append("text")
    //   .attr("x", 0)
    //   .attr("y", 40)
    //   .attr("value", "num_albums") // value to grab for event listener
    //   .classed("inactive", true)
    //   .text("# of Albums Released");
  
    // // append y axis
    // chartGroup.append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 0 - margin.left)
    //   .attr("x", 0 - (height / 2))
    //   .attr("dy", "1em")
    //   .classed("axis-text", true)
    //   .text("Number of Billboard 500 Hits");
  
    // // updateToolTip function above csv import
    // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
    // // x axis labels event listener
    // labelsGroup.selectAll("text")
    //   .on("click", function() {
    //     // get value of selection
    //     var value = d3.select(this).attr("value");
    //     if (value !== chosenXAxis) {
  
    //       // replaces chosenXAxis with value
    //       chosenXAxis = value;
  
    //       // console.log(chosenXAxis)
  
    //       // functions here found above csv import
    //       // updates x scale for new data
    //       xLinearScale = xScale(hairData, chosenXAxis);
  
    //       // updates x axis with transition
    //       xAxis = renderAxes(xLinearScale, xAxis);
  
    //       // updates circles with new x values
    //       circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
  
    //       // updates tooltips with new info
    //       circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
    //       // changes classes to change bold text
    //       if (chosenXAxis === "num_albums") {
    //         albumsLabel
    //           .classed("active", true)
    //           .classed("inactive", false);
    //         hairLengthLabel
    //           .classed("active", false)
    //           .classed("inactive", true);
    //       }
    //       else {
    //         albumsLabel
    //           .classed("active", false)
    //           .classed("inactive", true);
    //         hairLengthLabel
    //           .classed("active", true)
    //           .classed("inactive", false);
    //       }
    //     }
    //   });
  }).catch(function(error) {
    console.log(error);
  });
