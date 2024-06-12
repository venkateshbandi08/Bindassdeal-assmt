const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const playersRoute = require("./routes/players");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

connectMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/players", playersRoute);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
