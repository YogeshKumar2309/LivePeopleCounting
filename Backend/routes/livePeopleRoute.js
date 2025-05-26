const express = require("express");
const router = express.Router();
const ArduinoData = require("../models/ArduinoData");

// 🚀 GET latest people count for frontend (only latest value)
router.get("/live-people", async (req, res) => {
  try {
    const latest = await ArduinoData.findOne({}).sort({ createdAt: -1 });

    if (!latest) {
      return res.json({ people: 0 }); // fallback agar koi data nahi mila
    }

    res.json({ people: latest.people });
  } catch (err) {
    console.error("❌ Live People API Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
