const fs = require('fs');
const $ = require('jquery'); // Assuming you have jQuery installed via npm or included it separately

// Read the saved data from the file
fs.readFile('scraped_data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the JSON data
    const scrapedData = JSON.parse(data);

    // Visualize the data using Chart.js and jQuery
    visualizeData(scrapedData);
});

// Function to visualize the scraped data using Chart.js and jQuery
function visualizeData(data) {
    const smartphoneNames = data.map(entry => entry.name);
    const smartphonePrices = data.map(entry => entry.price);

    const ctx = $('#smartphoneChart')[0].getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: smartphoneNames,
            datasets: [{
                label: 'Smartphone Prices',
                data: smartphonePrices,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
