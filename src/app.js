const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const appUserRouter = require("./routes/appUserRouter");
const apiHorsecopedRouter = require("./routes/apiHorsecoped");
// Load env vars
dotenv.config();
// Connect to database
connectDB();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", appUserRouter);
app.use("/api/v1/api-horsecoped", apiHorsecopedRouter);
// Error handler
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
