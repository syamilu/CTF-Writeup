const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const AUTH_TOKEN = "seoscannerprotoken";

app.get("/", (req, res) => {
  res.render("index", { result: null, error: null });
});

app.get("/faq", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "faqs.html"));
});

app.post("/api/scan", async (req, res) => {
  const token = req.headers["authorization"];
  const site = req.body.site;

  if (!token || token !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const response = await axios.get(site, { timeout: 3000 });
    const titleMatch = response.data.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "No title tag found";

    // Return full response (raw) + title separately
    res.json({
      result: `SEO Scan Complete ✅<br>Title: ${title}`,
      raw: response.data,
    });
  } catch (err) {
    res.json({ error: "Unable to scan site.", raw: err.response.data });
  }
});

app.listen(3000, () => {
  console.log("SEO Scanner Pro running at http://localhost:3000");
});
