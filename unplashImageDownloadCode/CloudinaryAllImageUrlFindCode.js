import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
// cloudinary.config({
//   cloud_name: "",
//   api_key: ,
//   api_secret: "",
// });

async function getAllImagesFromProducts() {
  try {
    let allImages = [];
    let nextCursor = null;

    console.log(
      "🚀 Fetching all images from 'products' folder using Search API..."
    );

    do {
      // Using the Search API with proper chaining
      const result = await cloudinary.search
        .expression('resource_type:image AND folder:products')
        .max_results(100)
        .next_cursor(nextCursor)
        .execute();

      if (result.resources.length === 0) {
        console.log("⚠️ No images found in this batch.");
        break;
      }

      // Extract only URLs
      const urls = result.resources.map((file) => file.secure_url);
      allImages.push(...urls);

      // Update cursor for next batch
      nextCursor = result.next_cursor;
    } while (nextCursor);

    // Save all URLs into a text file
    fs.writeFileSync("product_image_links.txt", allImages.join("\n"));
    console.log(
      `✅ ${allImages.length} image URLs saved to product_image_links.txt`
    );
  } catch (error) {
    console.error("❌ Error fetching images:", error.message || error);
  }
}

getAllImagesFromProducts();