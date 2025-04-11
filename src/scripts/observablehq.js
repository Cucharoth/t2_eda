// const plot = Plot.rectY(
//     { length: 10000 },
//     Plot.binX({ y: "count" }, { x: Math.random })
// ).plot();
// const div = document.querySelector("#plot-2");
// div.append(plot);

fetch("./data/plot_ready/forks__size.json")
    .then((res) => res.json())
    .then(({ elbow_k, points }) => {
        const chart = Plot.plot({
            x: { label: "Number of Clusters (k)" },
            y: { label: "WCSS" },
            marks: [
                Plot.line(points, { x: "k", y: "wcss", stroke: "steelblue" }),
                Plot.dot(points, { x: "k", y: "wcss", fill: "steelblue" }),
                Plot.ruleY([0]),
                Plot.ruleX([0]),
                Plot.ruleX([elbow_k], {
                    stroke: "red",
                    strokeDasharray: "4 4",
                    label: `Elbow at k=${elbow_k}`,
                }),
            ],
        });

        document.getElementById("plot-1").appendChild(chart);
    });

fetch("../data/plot_ready/branch_data.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 500,
            height: 200,
            x: { label: "Percentage" },
            y: { label: null },
            marks: [
                Plot.ruleX([0]),
                Plot.barX(data, {
                    x: "percentage",
                    y: "label",
                    fill: "label",
                    title: (d) => `${d.percentage}%`,
                }),
                Plot.text(data, {
                    x: "percentage",
                    y: "label",
                    text: (d) => `${d.percentage}%`,
                    dx: 5,
                    dy: 0,
                    textAnchor: "start",
                    fill: "white",
                }),
            ],
        });
        document.getElementById("plot-2").appendChild(chart);
    });

fetch("../data/plot_ready/top_starred.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 600,
            height: 400,
            marginLeft: 150,
            marginRight: 50,
            marks: [
                Plot.barX(data, { x: "stars", y: "repo", fill: "#4CAF50" }),
                Plot.text(data, {
                    x: "stars",
                    y: "repo",
                    text: (d) => d.stars.toString(),
                    dx: 5,
                    textAnchor: "start",
                }),
            ],
            x: { label: "Stars" },
            y: { label: null },
        });

        document.getElementById("plot-3").appendChild(chart);
    });
