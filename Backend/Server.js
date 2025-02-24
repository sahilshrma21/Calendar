require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const leaveRoutes = require("./Routes/LeaveRoutes");



const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/leaves", leaveRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
