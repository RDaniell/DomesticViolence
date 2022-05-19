/* CONSTANTS AND GLOBALS */
const width = window.innerWidth*0.8,
      height = window.innerHeight*0.8,
      margin = {top:10,bottom:30,left:40,right:10},
      radius = 2;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;
let sizeScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedComplaint: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/DV-NYPD-Radiorun.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
             .domain(d3.extent(state.data, d => d.Precinct))
             .range([margin.left,width-margin.right])

  yScale = d3.scaleLinear()
             .domain(d3.extent(state.data, d => d.TotalComplaints))
             .range([height-margin.bottom, margin.top])

  //colorScale = d3.scaleOrdinal()
                 //.domain(["FelonyAssaultComplaints", "RapeComplaints", "MurderComplaints"])
                 //.range(["red", "blue", "purple"])

  //sizeScale = d3.scaleLinear()
                    //.domain(d3.extent(state.data, d => d.TotalComplaints))
                    //.range([1,10])

   colorScale = d3.scaleOrdinal()
   .domain(state.data.map(d=> d.Borough))
  .range(["tan", "orange", "orchid", "gray","purple"])

                    
  sizeScale = d3.scaleSqrt()
   .domain(d3.extent(state.data, d => d.MurderComplaints))
    .range([0,10])


  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")

  selectElement.selectAll("option")
               .data([{key: "TotalComplaints", label: "All"}, 
                     {key: "FelonyAssaultComplaints", label: "Felony Assault"},
                     {key: "RapeComplaints", label: "Rape"},
                     {key: "MurderComplaints", label: "Murder"}])
               .join("option")
               .attr("value", d => d.key)
               .text(d => d.label)
 
   selectElement.on("change", event =>
   { 
     // console.log("something changed")
     state.selectedComplaint = event.target.value
     console.log(event.target.value)
     draw();
   });
 console.log(state.selectedComplaint)

  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
          .append("svg")
          .attr("width", width)
          .attr("height", height)

  // + CALL AXES
  svg.append("g")
     .attr("transform", `translate(0, ${height - margin.bottom})`)
     .call(xAxis);

  svg.append("g")
     .attr("transform", `translate(${margin.left}, 0)`)
     .call(yAxis)
  
     draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
     .filter(d => state.selectedComplaint === d.MurderComplaints || state.selectedComplaint === "All")
     console.log(filteredData)
     
  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.id)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter
      .append("circle")
      .attr("r", 5) 
      .attr("cx", margin.left)
      .attr("cy", height-margin.bottom)
      .attr("fill", "black")
      .call(enter => enter
        .transition()
        .duration(1000)
        .attr("r", d => (sizeScale(d.MurderComplaints)*2))
        .attr("cx", d => xScale(d.Precinct))
        .attr("cy", d => yScale(d.TotalComplaints))
        .attr("fill", d => colorScale(d.Precinct)),

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit
        .remove()
      )
    );
      }