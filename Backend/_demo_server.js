// const express = require("express");
// const cors = require("cors");
// // const { SerialPort } = require("serialport"); // Correct way to import SerialPort
// // const { ReadlineParser } = require("@serialport/parser-readline"); // Correct way to import ReadlineParser

// // Express app setup
// const app = express();
// const port = 3000;







// // Arduino serial port
// // const arduinoPort = "COM3"; // Change this according to your system
// // const serialPort = new SerialPort({
// //   path: arduinoPort,
// //   baudRate: 9600,
// // });

// // Initialize parser
// // const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// // Log data received from Arduino
// // let newdata = 0;
// // parser.on('data', (data) => {
// //   console.log('Received from Arduino:', data);
// // ----------------------------------
// //  newdata = data ;
// // ----------------------------------

// // });
// // res.send(`${data}`);


// app.get("/api/arduino", (req, res) => {
//   res.send(ArduinoData);
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const ArduinoData = [
//   {
//     people: 21,
//     // people: newdata,
//   },
// ];


















// // // backend/index.js
// // const express = require("express");
// // const cors = require("cors");
// // const cookieParser = require("cookie-parser");

// // const app = express();
// // const port = 3000;

// // // Middleware
// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // React ka origin
// //     credentials: true, // cookies allow
// //   })
// // );
// // app.use(express.json());
// // app.use(cookieParser());

// // // Login Route
// // app.post("/api/login", (req, res) => {
// //   const { email, password } = req.body;
// //   console.log("Email:", email);
// //   console.log("Password:", password);

// //   if (email === "yogesh@gmail.com" && password === "123456") {
// //     res.cookie("isAdmin", "true", {
// //       httpOnly: true,
// //       secure: false, // production me true karna (HTTPS)
// //       maxAge: 1000 * 60 * 60 * 24, // 1 din
// //     });
// //     return res.json({ success: true });
// //   } else {
// //     return res.json({ success: false });
// //   }
// // });

// // // Cookie verify route
// // app.get("/api/check-admin", (req, res) => {
// //   const isAdmin = req.cookies.isAdmin;
// //   if (isAdmin === "true") {
// //     return res.json({ isAdmin: true });
// //   } else {
// //     return res.json({ isAdmin: false });
// //   }
// // });

// // // Arduino dummy data route
// // app.get("/api/arduino", (req, res) => {
// //   res.json({ people: 30 });
// // });

// // // Root route
// // app.get("/", (req, res) => {
// //   res.send("Arduino Data Server is running...");
// // });

// // // Start server
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });
