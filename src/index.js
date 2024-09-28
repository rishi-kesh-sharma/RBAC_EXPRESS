const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

const app = express();

require("./config/conn.js");

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
