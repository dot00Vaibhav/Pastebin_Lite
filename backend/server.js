const express = require("express");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// DB
connectDB();

// Routes
app.use("/api", require("./routes/pasteRoutes"));
app.use("/", require("./routes/viewRoutes"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
