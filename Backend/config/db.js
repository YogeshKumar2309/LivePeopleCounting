// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://yogesh12lohaghat:dWbiF0o3FcF4omRj@cluster0.bydqy.mongodb.net/arduino_project");
//     console.log("MongoDB Connected ✅");
//   } catch (error) {
//     console.error("MongoDB Connection Error ❌:", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
