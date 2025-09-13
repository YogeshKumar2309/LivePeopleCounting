// // const express = require("express");
// // const router = express.Router();
// // const ArduinoData = require("../models/ArduinoData");
// // const mongoose = require("mongoose");

// // const ADMIN_OBJECT_ID = "67dcfcc944f73abc910c4176";

// // // ✅ Arduino data save har 5 sec me
// // let currentPeopleCount = 0; // Starting count

// // setInterval(async () => {
// //   try {
// //     // Yaha Arduino ka real value ayega baad me
// //     currentPeopleCount = Math.floor(Math.random() * 100); // Fake data for now

// //     const newData = new ArduinoData({
// //       people: currentPeopleCount,
// //       adminId: new mongoose.Types.ObjectId(ADMIN_OBJECT_ID)
// //     });

// //     await newData.save();

// //     console.log("🔄 Auto Saved: ", currentPeopleCount);
// //   } catch (err) {
// //     console.error("❌ Auto Save Error:", err);
// //   }
// // }, 5000); // 5 sec = 5000 ms

// // // ✅ GET API for frontend - only people array
// // router.get("/arduino", async (req, res) => {
// //   try {
// //     const data = await ArduinoData.find({}).sort({ createdAt: -1 });

// //     const peopleArray = data.map(item => item.people); // sirf people array nikala

// //     res.json({
// //       response: 1,
// //       people: peopleArray
// //     });

// //   } catch (err) {
// //     console.error("❌ API Error:", err);
// //     res.status(500).json({ response: 0, msg: "Error fetching people count" });
// //   }
// // });

// // // ✅ Fallback API to get full records (optional)
// // router.get("/all", async (req, res) => {
// //   try {
// //     const data = await ArduinoData.find({}).sort({ createdAt: -1 });
// //     res.json({ success: true, data });
// //   } catch (err) {
// //     console.error("❌ Fetch Error:", err);
// //     res.status(500).json({ success: false, msg: "Failed to fetch data" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const ArduinoData = require("../models/ArduinoData");
// const mongoose = require("mongoose");
// // const { SerialPort } = require('serialport');
// // const { ReadlineParser } = require('@serialport/parser-readline');

// // // Change COM3 to the correct port on your system
// // const arduinoPort = 'COM3';

// // const serialPort = new SerialPort({
// //   path: arduinoPort,
// //   baudRate: 9600,
// // });
// // let peopleCount;
// // const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// // parser.on('data', (data) => {
// //   // console.log('Received from Arduino:', data.trim());
// //    peopleCount = parseInt(data.trim(), 10); // Convert string to integer
// // });

// const ADMIN_OBJECT_ID = "67dcfcc944f73abc910c4176";

// // ✅ Arduino data save har 5 sec me
// let currentPeopleCount = 0; // Starting count

// setInterval(async () => {
//   try {
//     // Yaha Arduino ka real value ayega baad me
//     currentPeopleCount = /*peopleCount*/ 10; 

//     const newData = new ArduinoData({
//       people: currentPeopleCount,
//       adminId: new mongoose.Types.ObjectId(ADMIN_OBJECT_ID)
//     });

//     await newData.save();

//     console.log("🔄 Auto Saved: ", currentPeopleCount);
//   } catch (err) {
//     console.error("❌ Auto Save Error:", err);
//   }
// }, 5000); // 5 sec = 5000 ms

// // ✅ GET API for frontend - only people array
// router.get("/arduino", async (req, res) => {
//   try {
//     const data = await ArduinoData.find({}).sort({ createdAt: -1 });

//     const peopleArray = data.map(item => item.people); // sirf people array nikala

//     res.json({
//       response: 1,
//       people: peopleArray
//     });

//   } catch (err) {
//     console.error("❌ API Error:", err);
//     res.status(500).json({ response: 0, msg: "Error fetching people count" });
//   }
// });

// // ✅ Fallback API to get full records (optional)
// router.get("/all", async (req, res) => {
//   try {
//     const data = await ArduinoData.find({}).sort({ createdAt: -1 });
//     res.json({ success: true, data });
//   } catch (err) {
//     console.error("❌ Fetch Error:", err);
//     res.status(500).json({ success: false, msg: "Failed to fetch data" });
//   }
// });

// module.exports = router;
