// @TODO: YOUR CODE HERE!

// svg container
var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 100,
  left: 100
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
var chosenYAxis="healthcare"

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

// function used for updating y-scale var upon click on axis label
function yScale(dataDemo, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(dataDemo, d => +d[chosenYAxis]),
        d3.max(dataDemo, d => +d[chosenYAxis])
      ])
      .range([chartHeight,0]);
  
    return yLinearScale;
  
  }

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  var xlabel;

  if (chosenXAxis === "poverty") {
    xlabel = "In Poverty (%)";
  }
  else if (chosenXAxis==="age") {
    xlabel = "Age (Median)";
  } 
  else {
      xlabel="Household Income (Median)"
  }

  var ylabel;

  if (chosenYAxis === "healthcare") {
    ylabel = "Lack of Healthcare (%)";
  }
  else if (chosenYAxis==="smokes") {
    ylabel = "Smokes (%)";
  } 
  else {
      ylabel="Obese (%)"
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${xlabel}: ${+d[chosenXAxis]}<br>${ylabel}: ${+d[chosenYAxis]}`);
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

    // yLinearScale function above csv import
    var yLinearScale = yScale(dataDemo, chosenYAxis);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
    //   .attr("transform", `translate(0, 0)`)
      .call(leftAxis);
  
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(dataDemo)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(+d[chosenXAxis]))
      .attr("cy", d => yLinearScale(+d[chosenYAxis]))
      .attr("r", 15)
      .attr("fill", "#23acd6")
      .attr("opacity", ".5");

    // append initial State Abbreviations
    var textGroup = chartGroup.selectAll("text")
        .data(dataDemo)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x", d => xLinearScale(+d[chosenXAxis]))
        .attr("y", d => yLinearScale(+d[chosenYAxis]))
  
    // Create group for three x-axis labels
    var xlabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth * .5}, ${chartHeight + 20})`);
  
    var povertyLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("In Poverty (%)");
  
    var ageLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age") // value to grab for event listener
      .classed("inactive", true)
      .text("Age (Median)");

    var incomeLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Income (Median)");

    // Create group for three y-axis labels
    var ylabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")
        .attr("transform", `translate(0, ${chartHeight *0.5})`);
  
    var healthcareLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", -70)
        .attr("value", "healthcare") // value to grab for event listener
        .classed("active", true)
        .text("Lack of Healthcare (%)");
  
    var smokesLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", -50)
        .attr("value", "smokes") // value to grab for event listener
        .classed("inactive", true)
        .text("Smokes (%)");

    var obeseLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", -30)
        .attr("value", "obesity") // value to grab for event listener
        .classed("inactive", true)
        .text("Obesity (%)");
    
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  
    // x axis labels event listener
    xlabelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
  
          // replaces chosenXAxis with value
          chosenXAxis = value;
  
          // console.log(chosenXAxis)
  
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(dataDemo, chosenXAxis);
  
          // updates x axis with transition
          xAxis = renderXAxes(xLinearScale, xAxis);
  
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  
          // changes classes to change bold text
          if (chosenXAxis === "age") {
            ageLabel
              .classed("active", true)
              .classed("inactive", false);
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "poverty"){
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            ageLabel
                .classed("active", false)
                .classed("inactive", true);
            povertyLabel
                .classed("active", false)
                .classed("inactive", true);
            incomeLabel
                .classed("active", true)
                .classed("inactive", false);

          }
        }
    });

    // y axis labels event listener
    ylabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {
  
          // replaces chosenYAxis with value
          chosenYAxis = value;
  
          // console.log(chosenXAxis)
  
          // functions here found above csv import
          // updates y scale for new data
          yLinearScale = yScale(dataDemo, chosenYAxis);
  
          // updates y axis with transition
          yAxis = renderYAxes(yLinearScale, yAxis);
  
          // updates circles with new y values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  
          // changes classes to change bold text
          if (chosenYAxis === "healthcare") {
            healthcareLabel
              .classed("active", true)
              .classed("inactive", false);
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
            obeseLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenYAxis === "smokes"){
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", true)
              .classed("inactive", false);
            obeseLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            healthcareLabel
                .classed("active", false)
                .classed("inactive", true);
            smokesLabel
                .classed("active", false)
                .classed("inactive", true);
            obeseLabel
                .classed("active", true)
                .classed("inactive", false);

          }
        }
    });
}).catch(function(error) {
    console.log(error);
});

