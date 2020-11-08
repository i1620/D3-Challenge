// @TODO: YOUR CODE HERE!
function makeResponsive() {

    let svgWidth = 660;
    let svgHeight = 460;

    let margin = {
            top: 20,
            right: 40,
            bottom: 80,
            left: 100
        };

    // Calculating chart width and height
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    // SVG wrapper
    let svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Append SVG
    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})` )

    // Import data from csv file
    d3.csv("assets/data/data.csv")
        .then(function (riskData) {

            // Get data from csv file
            riskData.forEach(function (data) {
                data.age = +data.age;
                data.smokes = +data.smokes;
                data.healthcare = +data.healthcare;
                data.poverty = +data.poverty;
                data.abbr = data.abbr;
                data.income = +data.income;
            });
            
            // Scales for X and Y
            let xLinearScale = d3.scaleLinear()
                .domain([8.5, d3.max(riskData, d=> d.poverty)])
                .range([0,width]);
            
            let yLinearScale = d3.scaleLinear()
                .domain([3.5, d3.max(riskData, d=>d.healthcare)])
                .range([height,0]);
            
            // Creating the axis
            let xAxis =d3.axisBottom(xLinearScale);
            let yAxis = d3.axisLeft(yLinearScale);

            // Append axis to chartGroup
            chartGroup.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);
            
            chartGroup.append("g")
                .call(yAxis);

            // Make circles
            let circlesGroup = chartGroup.selectAll("circle")
                .data(riskData)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d.poverty))
                .attr("cy", d => yLinearScale(d.healthcare))
                .attr("r",10)
                .attr("fill","blue")
                .attr("opacity",".6")
                .attr("stroke-width","1")
                .attr("stroke","black");
            
                // States names
            chartGroup.select("g")
                .selectAll("circle")
                .data(riskData)
                .enter()
                .append("text")
                .text(d => d.abbr)
                .attr("x", d => xLinearScale(d.poverty))
                .attr("y", d => yLinearScale(d.healthcare))
                .attr("dy", -400)
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "red");

            console.log(riskData);

            
        });
}

makeResponsive();