const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const appUserRouter = require("./routes/appUserRouter");
const apiHorsecopedRouter = require("./routes/apiHorsecoped");
const paramsApiRouter = require("./routes/paramsApiRouter");
const getDataLaSoRouter = require("./routes/getDataLaSoRouter");
const dashboarRouter = require("./routes/dashboarRouter");
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
app.use("/api/v1/params-api", paramsApiRouter);
app.use("/api/v1/data-la-so", getDataLaSoRouter);
app.use("/api/v1/dashboard", dashboarRouter);
// Error handler
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
