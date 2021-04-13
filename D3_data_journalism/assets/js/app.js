// @TODO: YOUR CODE HERE!

// svg container
var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append an SVG group
// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(dataDemo, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(dataDemo, d => +d[chosenXAxis]),
      d3.max(dataDemo, d => +d[chosenXAxis])
    ])
    .range([0, chartWidth]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "poverty") {
    label = "In Poverty (%)";
  }
  else if (chosenXAxis==="age") {
    label = "Age (Median)";
  } 
  else {
      label="Household Income (Median)"
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
};

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
    var states_arr=dataDemo.map(data=>data.state);
    var poverty_arr=dataDemo.map(data=>+data.poverty);
    var age_arr=dataDemo.map(data=>+data.age);
    var income_arr=dataDemo.map(data=>+data.income);
    var healthcare_arr=dataDemo.map(data=>+data.healthcare);
    var obesity_arr=dataDemo.map(data=>+data.obesity);
    var smokes_arr=dataDemo.map(data=>+data.smokes);
    console.log("states",states_arr);
    console.log("poverty",poverty_arr)
    console.log("age",age_arr)
    console.log("income",income_arr)
    console.log("healthcare",healthcare_arr)
    console.log("obesity",obesity_arr)
    console.log("smokes",smokes_arr)

  
    // xLinearScale function above csv import
    var xLinearScale = xScale(dataDemo, chosenXAxis);
  
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(dataDemo, d => +d.healthcare)])
      .range([chartHeight, 0]);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
  
    // append y axis
    chartGroup.append("g")
      .call(leftAxis);
  
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(dataDemo)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 20)
      .attr("fill", "pink")
      .attr("opacity", ".5");
  
    // // Create group for two x-axis labels
    // var labelsGroup = chartGroup.append("g")
    //   .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);
  
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

