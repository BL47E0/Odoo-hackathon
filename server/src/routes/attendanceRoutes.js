import express from "express";
import {
    checkIn,
    checkOut,
    getTodayAttendance,
    getAttendanceHistory
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/:employeeId/check-in", checkIn);
router.post("/:employeeId/check-out", checkOut);
router.get("/:employeeId/today", getTodayAttendance);
router.get("/:employeeId", getAttendanceHistory);

export default router;