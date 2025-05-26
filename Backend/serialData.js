// serialData.js
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let arduinoData = { people: 0 };

const arduinoPort = "COM3"; 
const serialPort = new SerialPort({
  path: arduinoPort,
  baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
  const peopleCount = parseInt(data.trim());
  if (!isNaN(peopleCount)) {
    arduinoData.people = peopleCount;
    console.log("Received from Arduino:", peopleCount);
  }
});

function getArduinoData() {
  return arduinoData;
}

module.exports = { getArduinoData };
