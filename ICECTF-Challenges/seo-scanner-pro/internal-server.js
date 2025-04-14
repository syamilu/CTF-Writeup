const express = require("express");
const app = express();

app.get("/internal/flag", (req, res) => {
  res.send("🔐 Admin Access Only<br>Flag: <b>ICECTF{ssrf_scan_ftw_89866b}</b>");
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Internal Admin Dashboard</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f6f8;
            padding: 40px;
          }
          .dashboard {
            background: white;
            border-radius: 8px;
            padding: 30px;
            max-width: 700px;
            margin: auto;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2d2d2d;
          }
          ul {
            text-align: left;
          }
          code {
            background-color: #eee;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="dashboard">
          <h1>🔐 Internal Admin Dashboard</h1>
          <p>Welcome, admin! This panel shows internal-only system status and logs.</p>

          <h3>🖥️ System Overview</h3>
          <ul>
            <li>SEO Scanner: ✅ Running</li>
            <li>Job Queue: 🟢 0 pending scans</li>
            <li>Flag Endpoint: <code>/internal/flag</code></li>
          </ul>

          <h3>📝 Recent Activity</h3>
          <ul>
            <li>Scan triggered from <code>http://localhost:3000</code></li>
            <li>Scan job 3521 complete ✅</li>
            <li>Unauthorized access attempt blocked 🚫</li>
          </ul>

          <p><strong>Note:</strong> This panel is internal-only. If you're seeing this, you may be exploiting a vulnerability. 👀</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(4889, "127.0.0.1", () => {
  console.log("Internal service running at http://localhost:4889");
});
