import express from "express";
import {
    createLeaveType,
    getLeaveTypes,
    createLeaveAllocation,
    getLeaveAllocations,
    createLeaveRequest,
    getLeaveRequests
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/types", createLeaveType);
router.get("/types", getLeaveTypes);
router.post("/:employeeId/allocations", createLeaveAllocation);
router.get("/:employeeId/allocations", getLeaveAllocations);
router.post("/:employeeId/requests", createLeaveRequest);
router.get("/:employeeId/requests", getLeaveRequests);

export default router;