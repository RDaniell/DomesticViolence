const width = window.innerWidth * .8;
const height = window.innerHeight *.8;
const margins = { top: 10, bottom: 25, left: 10, right: 10 };

let svg;
let xScale;
let yScale;

let state = {
  data:[],
  selection: "all"
};


d3.csv('../data/Reports in 2021.csv', d3.autoType).then(data => {
    console.log("data", data);
    state.data = raw_data;
    init();
});

function init() {

    
    // 3 - SCALES - define visual x and y scales

    // create SCALES first using variables
    // each scale needs a scale type
    // X Scale is type categorical, based on Borough data
    // for X categorical type use d3.scaleBand
    // Y Scale is type continuous quantitative numeric
    // for Y numeric type use d3.scaleLinear
    // for each scale need a Domain and a Range
    // DOMAIN is your DATA categories/min/max
    // RANGE is your VISUAL categories/min/max
    // scale provides translator between data and visuals
    // for X scale range - visual min 0 and max the window width
    // for X scale domain - our Borough types
    // x domain as "running" "chasing" but pull dynamic data
    // y scale linear so Domain is max and min values to display
    // frequently desired linear min value is 0
    // X range saying "let's go from zero position to..."
    // Y range saying "max lowpoint of ___ then back to zero"

    xScale = d3.scaleBand()
    .domain(state.data.map(d=> d.Borough))
    .range([margin.left, width-margin.right])
    .paddingInner(.4)

 
    yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d=> d.count)]) // domain relates to data
    .range([height-margin.bottom, margin.top])  // range relates to visuals


    const container = d3.select("#container")
    .style("position", "relative");

    svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "relative");

    tooltip = d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("z-index","10")
    .style("position","absolute")
    .style("visibility","hidden")
    .style("opacity",0.08)
    .style("padding","8px")
    .text("tooltip");

    const dropdown = d3.select("dropdown")

    dropdown.selectAll("options")
    .data(["all","Manhattan","Bronx","Queens","Brooklyn","Staten Island"])
    .join("option")
    .attr("value", d => d)
    .text(d => d)

    dropdown.on("change", event => {
      state.selection = event.target.value
      console.log(state.selection)
      draw();
    })

    draw();
  }
function draw() {

  const filteredData = stat.data.filteredData(d => state.selection === d.activity || state.
    selection === "all")
    console.log(filteredData)

        svg.selectAll("rect")
        .data(filteredData)
        .join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth)
        .attr("height", d=> height - margin.bottom - yScale(d.count))
        .attr("x", d=>xScale(d.Borough))
        .attr("y", d=>yScale(d.count))
        .attr("fill", "purple") // color option
        .on("mouseover", function(event,d,i){
          tooltip
          .html(`<div>activity: ${d.Borough}</
          div><div>sightings: ${d.count}</div>`)
          .style("visibiliy", "visible")
          .style("opacity", .8)
          .style("background","yellow")
        })
        .on("mouseout", function(event, d){
          tooltip
          .html(``)
          .style("visibility", "hidden")
        })

      }