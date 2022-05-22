const width = window.innerWidth * .8;
const height = window.innerHeight *.8;
const margin = { top: 15, bottom: 10, left: 10, right: 10};

let svg;
let xScale;
let yScale;

let state = {
  data:[],

  selection: "all"
};

d3.csv('../data/Reportsin2021.csv', d3.autoType).
then(data => {
    console.log("data", data);
    state.data = data;
    init();
});

function init() {

    xScale = d3.scaleBand()
    .domain(state.data.map(d=> d.Borough))
    .range([margin.left, width-margin.right])
    .paddingInner(.4)

 
    yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d=> d.count)])// domain relates to data
    .range([height-margin.bottom, margin.top])// range relates to visuals


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

  const filteredData = state.data
  .filter(d => state.selection === d.Borough || state.
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
          .html(`<div>Borough: ${d.Borough}</
          div><div>sightings: ${d.count}</div>`)
          .style("visibiliy", "visible")
          .style("opacity", .8)
          .style("background","yellow")
        })
        .on("mousemove", function(event){
          tooltip
          .style("top", event.pageY -10 + "px")
          .style("left", event.pageX + 10 + "px")
        })
        .on("mouseout", function(event, d){
          tooltip
          .html(``)
          .style("visibility", "hidden");
        });
      }