# Belly_Button_Biodiversity_Analysis

This project focuses on creating an interactive dashboard to explore the Belly Button Biodiversity dataset. The dataset, which can be found here, catalogs the microbes present in human navels. It reveals insights into the prevalence of microbia present in human navels. It reveals insights into the prevalence of microbial species (OTUs) among individuals, indicating certain species' presence in more than 70% of people while others are relatively rare.

Project Overview

The goal of this project is to build an interactive dashboard that visualizes the Belly Button Biodiversity dataset using D3 library and Poltly.js. The dashboard includes the following components:

    * Horizontal bar chart displaying the top 10 operational taxonomic units (OTUs) found in each individual, using sample_values as bar values, otu_ids as labels, and otu_labels as hovertext.
    * Bubble chart visualizing each sample with otu_ids for x values, sample_values for y values and marker size, otu_ids for marker colors, and otu_labels for text values.
    * Display of sample metadata, showcasing an individual's demographic information.
    * Updating of all polts upon selection of a new sample.
    * Depolyment of the app to a free static page hosting serivce, such as GitHub Pages.

Instructions

Follow these steps to complete the project:
    1. Use the D3 library to read in the "sample.json" data from the provided URL.
    2. Create a horizontal bar chart and a dropdown menu to display the top 10 OtUs found in an individual.
    3. Create a bubble chart to display each sample's microbial information.
    4. Display sample metadata (demographic information) on the page.
    5. Update all plots when a new sample is selected.



