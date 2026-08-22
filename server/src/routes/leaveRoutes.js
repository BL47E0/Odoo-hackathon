import express from "express";
import {
    createLeaveType,
    getLeaveTypes,
    createLeaveAllocation,
    getLeaveAllocations,
    createLeaveRequest,
    getLeaveRequests,
    getPendingLeaveRequests,
    approveLeaveRequest
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/types", createLeaveType);
router.get("/types", getLeaveTypes);
router.post("/:employeeId/allocations", createLeaveAllocation);
router.get("/:employeeId/allocations", getLeaveAllocations);
router.get("/requests/pending", getPendingLeaveRequests);

router.post("/:employeeId/requests", createLeaveRequest);
router.get("/:employeeId/requests", getLeaveRequests);
router.put("/requests/:id/approve", approveLeaveRequest);

export default router;