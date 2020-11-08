// @TODO: YOUR CODE HERE!
const svgWidth = 960;
const svgHeight = 500;

const margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

// Calculating chart width and height
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// SVG wrapper
const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append SVG group
const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})` )

// Initial params
var chosenXaxis = "poverty";
var chosenYaxis = "healthcare";

function renderXAxes(newXScale, XAxis) {
    const bottomAxis = d3.axisBottom(newXScale);

    XAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return XAxis;
}