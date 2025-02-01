const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const appUserRouter = require("./routes/appUserRouter");
const apiHorsecopedRouter = require("./routes/apiHorsecoped");
const paramsApiRouter = require("./routes/paramsApiRouter");
const getDataLaSoRouter = require("./routes/getDataLaSoRouter");
const dashboarRouter = require("./routes/dashboarRouter");
const blogRouter = require("./routes/blogRouter");
const TaiLieuDinhKemRouter = require("./routes/TaiLieuDinhKemRouter");

// Load env vars
dotenv.config();
// Connect to database
connectDB();
const app = express();

// Middleware
app.use(
    cors({
        origin: "*", // Chỉ cho phép từ localhost:3000
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Cho phép gửi cookie hoặc token nếu cần
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use("/api/v1/users", appUserRouter);
app.use("/api/v1/api-horsecoped", apiHorsecopedRouter);
app.use("/api/v1/params-api", paramsApiRouter);
app.use("/api/v1/data-la-so", getDataLaSoRouter);
app.use("/api/v1/dashboard", dashboarRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/attachment", TaiLieuDinhKemRouter);

// Error handler
app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
