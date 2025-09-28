import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// JSON desserts list
const desserts = [
  "Chocolate Pudding","Vanilla Pudding","Rice Pudding (Kheer)","Bread Pudding",
  "Caramel Pudding","Mango Pudding","Coconut Pudding","Butterscotch Pudding",
  "Banana Pudding","Tapioca Pudding","Chia Pudding","Lemon Pudding","Panna Cotta",
  "Crème Brûlée","Chocolate Mousse","Fruit Trifle","Semolina Pudding (Suji Halwa)",
  "Crème Caramel","Jelly Pudding","Chocolate Truffle Cake","Red Velvet Cake",
  "Black Forest Cake","Vanilla Sponge Cake","Strawberry Cake","Butterscotch Cake",
  "Pineapple Upside Down Cake","Coffee Mocha Cake","Lemon Drizzle Cake","Carrot Cake",
  "Blueberry Pastry","Oreo Cookie","Strawberry Ice Cream","Dark Chocolate","Mango Custard",
  "Vanilla Croissant","Almond Danish","Chocolate Éclair","Raspberry Tart","Pecan Pie",
  "Caramel Roll","Lemon Tart","Cinnamon Roll","Apple Strudel","Chocolate Croissant",
  "Chocolate Chip Cookie","Oatmeal Cookie","Peanut Butter Cookie","Double Chocolate Cookie",
  "Sugar Cookie","Coconut Cookie","Almond Cookie","M&M Cookie","White Chocolate Cookie",
  "Macadamia Cookie","Mint Chocolate Cookie","Hazelnut Cookie","Cranberry Cookie",
  "Ginger Cookie","Cinnamon Cookie","Vanilla Ice Cream","Chocolate Ice Cream",
  "Strawberry Ice Cream","Mango Ice Cream","Butterscotch Ice Cream","Coffee Ice Cream",
  "Pistachio Ice Cream","Black Currant Ice Cream","Blueberry Ice Cream","Mint Chocolate Chip Ice Cream",
  "Caramel Ice Cream","Lemon Sorbet Ice Cream","Raspberry Ice Cream","Coconut Ice Cream",
  "Tiramisu Ice Cream","Dark Chocolate Bar","Milk Chocolate","White Chocolate",
  "Chocolate Truffles","Hazelnut Chocolate","Almond Chocolate","Chocolate Caramel",
  "Mint Chocolate","Chocolate Fudge","Chocolate Hazelnut Spread","Chocolate Coconut",
  "Chocolate Almond Truffle","Chocolate Orange","Chocolate Peanut Butter","Strawberry Tart",
  "Banana Cake","Apple Crumble","Mixed Fruit Parfait","Blueberry Muffin","Cherry Pie",
  "Kiwi Tart","Fruit Salad","Gulab Jamun","Jalebi","Rasgulla","Ladoo","Barfi","Kaju Katli",
  "Peda","Soan Papdi","Ras Malai","Balushahi","Mysore Pak","Kheer","Puran Poli","Modak",
  "Laddu Besan"
];

// IMAGES SAVE FOLDER
const downloadFolder = path.join(process.cwd(), "images");

// if folder does not exist
if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder);
}

// Function to download image by query
async function downloadImage(query) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        per_page: 1, // top result
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    if (response.data.results.length === 0) {
      console.log(`❌ No image found for: ${query}`);
      return;
    }

    // Full resolution image with width=4000 & height=6000
    const imageUrl = `${response.data.results[0].urls.raw}&w=4000&h=6000&fit=crop`;
    const safeName = query.replace(/[\/\\?%*:|"<>]/g, "-"); // filename safe banane ke liye
    const filePath = path.join(downloadFolder, `${safeName}.webp`);

    const imgRes = await axios.get(imageUrl, { responseType: "stream" });
    imgRes.data.pipe(fs.createWriteStream(filePath));

    console.log(`✅ Downloaded: ${safeName}.webp`);
  } catch (error) {
    console.error(`❌ Error downloading ${query}:`, error.message);
  }
}

// Loop over all desserts
(async () => {
  for (const dessert of desserts) {
    await downloadImage(dessert);
    await new Promise(resolve => setTimeout(resolve, 1000)); // delay for rate limit
  }
})();
