const express = require('express');
const fs = require('fs');


const Chart = require('chart.js');

const { Builder, By } = require('selenium-webdriver');

const app = express();

const scrapedData = [];

// Function to scrape smartphone pricing data from the first website
async function scrapeWebsite1() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'https://www.kigalidiscount.com/collections/cell-phones-smartphones';
        await driver.get(url);

        const smartphoneNames = await driver.findElements(By.css('.product-item__title'));
        const smartphonePrices = await driver.findElements(By.css('.price'));

        const dateTimeScraped = new Date().toLocaleString();

        for (let i = 0; i < smartphoneNames.length; i++) {
            const smartphoneName = await smartphoneNames[i].getText();
            const smartphonePrice = await smartphonePrices[i].getText();

            addScrapedData(smartphoneName, smartphonePrice);

            console.log('Website:', url);
            console.log('Smartphone Name:', smartphoneName);
            console.log('Smartphone Price:', smartphonePrice);
            console.log('Date/Time Scraped:', dateTimeScraped);
            console.log('---------------------------------------');
        }
    } catch (error) {
        console.error('An error occurred while scraping from Website 1:', error);
    } finally {
        await driver.quit();
    }
}

// Function to scrape smartphone pricing data from the second website
async function scrapeWebsite2() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'https://thenewspecies.com/product-category/smartphone/';
        await driver.get(url);

        const smartphoneNames = await driver.findElements(By.css('.woocommerce-loop-product__title'));
        const smartphonePrices = await driver.findElements(By.css('.price'));

        const dateTimeScraped = new Date().toLocaleString();

        for (let i = 0; i < smartphoneNames.length; i++) {
            const smartphoneName = await smartphoneNames[i].getText();
            const smartphonePrice = await smartphonePrices[i].getText();

            addScrapedData(smartphoneName, smartphonePrice);

            console.log('Website:', url);
            console.log('Smartphone Name:', smartphoneName);
            console.log('Smartphone Price:', smartphonePrice);
            console.log('Date/Time Scraped:', dateTimeScraped);
            console.log('---------------------------------------');
        }
    } catch (error) {
        console.error('An error occurred while scraping from Website 1:', error);
    } finally {
        await driver.quit();
    }
}

// Function to scrape smartphone pricing data from the third website
async function scrapeWebsite3() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'https://rw.zimcompass.com/phones';
        await driver.get(url);

        const smartphoneNames = await driver.findElements(By.css('.description'));
        const smartphonePrices = await driver.findElements(By.css('.price'));

        const dateTimeScraped = new Date().toLocaleString();

        for (let i = 0; i < smartphoneNames.length; i++) {
            const smartphoneName = await smartphoneNames[i].getText();
            const smartphonePrice = await smartphonePrices[i].getText();

            addScrapedData(smartphoneName, smartphonePrice);

            console.log('Website:', url);
            console.log('Smartphone Name:', smartphoneName);
            console.log('Smartphone Price:', smartphonePrice);
            console.log('Date/Time Scraped:', dateTimeScraped);
            console.log('---------------------------------------');
        }
    } catch (error) {
        console.error('An error occurred while scraping from Website 1:', error);
    } finally {
        await driver.quit();
    }
}

// Call each scraping function for the respective website
(async () => {
    await scrapeWebsite1();
    await scrapeWebsite2();
    await scrapeWebsite3();

    saveDataToFile();
})();

// Function to save scraped data to a file
function saveDataToFile() {
    const dataToSave = JSON.stringify(scrapedData);

    fs.writeFile('scraped_data.json', dataToSave, (err) => {
        if (err) throw err;
        console.log('Scraped data saved to file.');
    });
}

// Helper function to add scraped data to the array
function addScrapedData(name, price) {
    scrapedData.push({ name, price });
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});