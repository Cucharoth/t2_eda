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

fetch("./data/plot_ready/branch_data.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 500,
            height: 200,
            marginRight: 50,
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

fetch("./data/plot_ready/top_starred.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 600,
            height: 400,
            marginLeft: 150,
            marginRight: 50,
            marks: [
                Plot.barX(data, { x: "stars", y: "repo", fill: "#669e5c" }),
                Plot.ruleX([0]),
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

fetch("./data/plot_ready/created_year.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 700,
            height: 400,
            marginTop: 30,
            marginBottom: 40,
            marks: [
                Plot.ruleY([0]),
                Plot.ruleX([0]),
                Plot.barY(data, {
                    x: "year",
                    y: "count",
                    fill: "#2196F3",
                }),
                Plot.text(data, {
                    x: "year",
                    y: "count",
                    text: (d) => d.count.toString(),
                    dy: -5,
                    textAnchor: "middle",
                }),
            ],
            x: { label: "Year", tickFormat: (d) => d.toString() },
            y: { label: "Repositories Created" },
        });

        document.getElementById("plot-4").appendChild(chart);
    });

fetch("./data/plot_ready/issues_vs_stars.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 700,
            height: 500,
            grid: true,
            marginTop: 30,
            marginBottom: 40,
            color: {
                type: "diverging",
                scheme: "Spectral",
            },
            marks: [
                Plot.dot(data, {
                    x: "stars",
                    y: "issues",
                    r: 4,
                    stroke: "issues",
                    fill: "issues",
                }),
                Plot.tip(
                    data,
                    Plot.pointer({
                        x: "stars",
                        y: "issues",
                        fill: "black",
                    })
                ),
            ],
            x: { label: "Stars" },
            y: { label: "Open Issues" },
        });

        document.getElementById("plot-5").appendChild(chart);
    });

fetch("./data/plot_ready/stars_over_time.json")
    .then((res) => res.json())
    .then((data) => {
        const chart = Plot.plot({
            width: 700,
            height: 500,
            marks: [
                Plot.ruleY([0]),
                Plot.line(data, {
                    x: "created_year",
                    y: "stargazers_count",
                    stroke: "steelblue",
                    strokeWidth: 2,
                }),
                Plot.dot(data, {
                    x: "created_year",
                    y: "stargazers_count",
                    fill: "steelblue",
                    r: 4,
                }),
            ],
            x: { label: "Year", tickFormat: (d) => d.toString() },
            y: { label: "Total Stars" },
        });

        document.getElementById("plot-6").appendChild(chart);
    });
