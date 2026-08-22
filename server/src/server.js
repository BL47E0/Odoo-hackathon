import express from "express";
import cors from "cors";

import attendanceRoutes from "./routes/attendanceRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hr", hrRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Dayflow API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Dayflow API running on http://localhost:${PORT}`);
});