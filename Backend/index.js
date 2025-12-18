const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* Database Connection */
connectDB();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Test Route */
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

/* User Routes */
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

/* Server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
