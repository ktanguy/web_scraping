const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const Chart = require("chart.js");

const { Builder, By } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const options = new firefox.Options();
options.addArguments("--headless");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

const scrapedData = [];

// Function to scrape smartphone pricing data from the first website
async function scrapeWebsite1() {
  let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  try {
    const url =
      "https://www.kigalidiscount.com/collections/cell-phones-smartphones";
    await driver.get(url);
    const retailer = "kigalidiscount";

    const smartphoneNames = await driver.findElements(
      By.css(".product-item__title")
    );
    const smartphonePrices = await driver.findElements(By.css(".price"));

    const dateTimeScraped = new Date().toLocaleString();

    for (let i = 0; i < smartphoneNames.length; i++) {
      const smartphoneName = await smartphoneNames[i].getText();
      const smartphonePrice = await smartphonePrices[i].getText();

      addScrapedData(
        smartphoneName,
        smartphonePrice,
        retailer,
        dateTimeScraped
      );

      console.log("Website:", url);
      console.log("Smartphone Name:", smartphoneName);
      console.log("Smartphone Price:", smartphonePrice);
      console.log("Date/Time Scraped:", dateTimeScraped);
      console.log("---------------------------------------");
    }
  } catch (error) {
    console.error("An error occurred while scraping from Website 1:", error);
  } finally {
    await driver.quit();
  }
}

// Function to scrape smartphone pricing data from the second website
async function scrapeWebsite2() {
  let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  try {
    const url = "https://thenewspecies.com/product-category/smartphone/";
    await driver.get(url);
    const retailer = "thenewspecies";

    const smartphoneNames = await driver.findElements(
      By.css(".woocommerce-loop-product__title")
    );
    const smartphonePrices = await driver.findElements(By.css(".price"));

    const dateTimeScraped = new Date().toLocaleString();

    for (let i = 0; i < smartphoneNames.length; i++) {
      const smartphoneName = await smartphoneNames[i].getText();
      const smartphonePrice = await smartphonePrices[i].getText();

      addScrapedData(
        smartphoneName,
        smartphonePrice,
        retailer,
        dateTimeScraped
      );
    }
  } catch (error) {
    console.error("An error occurred while scraping from Website 1:", error);
  } finally {
    await driver.quit();
  }
}

// Function to scrape smartphone pricing data from the third website
async function scrapeWebsite3() {
  let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  try {
    const retailer = "zimcompass";
    const url = "https://rw.zimcompass.com/phones";
    await driver.get(url);

    const smartphoneNames = await driver.findElements(By.css(".description"));
    const smartphonePrices = await driver.findElements(By.css(".price"));

    const dateTimeScraped = new Date().toLocaleString();

    for (let i = 0; i < smartphoneNames.length; i++) {
      const smartphoneName = await smartphoneNames[i].getText();
      const smartphonePrice = await smartphonePrices[i].getText();

      addScrapedData(
        smartphoneName,
        smartphonePrice,
        retailer,
        dateTimeScraped
      );

      console.log("Website:", url);
      console.log("Smartphone Name:", smartphoneName);
      console.log("Smartphone Price:", smartphonePrice);
      console.log("Date/Time Scraped:", dateTimeScraped);
      console.log("---------------------------------------");
    }
  } catch (error) {
    console.error("An error occurred while scraping from Website 1:", error);
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

  fs.writeFile(
    "public/scraped_data.json",
    JSON.stringify(dataToSave, null, 2),
    { encoding: "utf-8", flag: "w" },
    (err) => {
      if (err) throw err;
      console.log("Scraped data saved to file.");
    }
  );
}

app.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "public", "scraped_data.json");
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    res.render("index", { jsonData });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Helper function to add scraped data to the array
function addScrapedData(name, price, retailer, time) {
  scrapedData.push({ name, price, retailer, time });
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
