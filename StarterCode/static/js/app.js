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

        // call function plotGuage to plot gauge chart
        plotGauge(wFreq)
    });
}
