const plot = Plot.rectY(
    { length: 10000 },
    Plot.binX({ y: "count" }, { x: Math.random })
).plot();
const div = document.querySelector("#plot-1");
div.append(plot);
