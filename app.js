// app.js
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = 3000;
app.use(express.static("public"));

// Proxy route to call Canvas API from the server
app.get("/api/events", async (req, res) => {
  const { CANVAS_API_TOKEN, CANVAS_BASE_URL } = process.env;
  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const endDate = oneWeekLater.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `${CANVAS_BASE_URL}/api/v1/calendar_events?start_date=${today}&end_date=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${CANVAS_API_TOKEN}`,
        },
      }
    );
    const events = await response.json();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
