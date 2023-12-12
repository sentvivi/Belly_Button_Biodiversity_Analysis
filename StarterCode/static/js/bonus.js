//public function for plot gauge chart
function plotGauge(wFreq) {
    // plot gauge chart
    let gaugeTrace = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: wFreq,
        title: { text: "<b>Bellybutton Washing Frequency</b> <br>Scrubs per Week", font: { size: 24 } },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9]},
            bar: { color: "#000000"},
            steps: [
                { range: [0, 1], color: "#f7fcf5" },
                { range: [1, 2], color: "#e5f5e0" },
                { range: [2, 3], color: "#c7e9c0" },
                { range: [3, 4], color: "#a1d99b" },
                { range: [4, 5], color: "#74c476" },
                { range: [5, 6], color: "#41ab5d" },
                { range: [6, 7], color: "#238b45" },
                { range: [7, 8], color: "#006d2c" },
                { range: [8, 9], color: "#00441b" },                    
            ],
        }
    }];
    let gaugeLayout = {
        margin: { t: 20, b: 20, l: 20, r: 30 },
    };
    Plotly.newPlot("gauge", gaugeTrace, gaugeLayout);
}    