// initialize dropdown
let selector = d3.select("#selDataset");
console.log("view if data are fatched: ", selector);
// Fetch data
d3.json("samples.json").then((data) => {
    
    //assign data.names array to sampleID array
    let sampleID = data.names;
    console.log("verify if dropdown ID are filtered: ", sampleID);

    // First sample to build the initial plots
    let firstSample = sampleID[0];
    // Verify firstSample for init program start
    console.log("Init ID at start :", firstSample);

    // Populate dropdown select options
    selector.selectAll("option")
    .data(sampleID)
    .enter()
    .append("option")
    .text(d => d)
    .attr("value", d => d);

    // Function call to build chart and panel
    buildCharts(firstSample);
    buildMetadata(firstSample);
});

// Function to update dashboard with new selected sample
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Build metadata
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata;

        // Filter metadata with desired sample number
        let metadataArray = metadata.filter(sampleObject => sampleObject.id == sample);
        let result = metadataArray[0];
        console.log("Verify Sample ID data match for Panel: ", result);

        // Select the panel with id
        let panel = d3.select("#sample-metadata");

        // Clear existing metadata
        panel.html("");

        // Append each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Function to build charts
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        let samples = data.samples;
        let sampleNumber = samples.filter(sampleObject => sampleObject.id == sample);

        let resultArray = data.metadata.filter(sampleObject => sampleObject.id == sample);
        let firstSample = sampleNumber[0];
        let result = resultArray[0];

        let otu_ids = firstSample.otu_ids;
        let sample_values = firstSample.sample_values;
        let otu_labels = firstSample.otu_labels;        
        let wFreq = result.wfreq;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU: ${otuId}`).reverse();

        // Create trace for bar chart
        let barTrace = [{
            type: 'bar',
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            orientation: 'h',
            text: otu_labels.slice(0, 10).reverse()
        }];
        let barLayout = {
            margin: { t: 0, l: 150 }
        };
        Plotly.newPlot('bar', barTrace, barLayout);

        // Create trace for bubble chart
        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        let bubbleLayout = {
            xaxis: { title: "OTU ID" },
        };

        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);

        // Create trace for gauge chart
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
    });
}
