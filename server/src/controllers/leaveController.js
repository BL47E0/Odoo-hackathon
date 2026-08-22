import prisma from "../lib/prisma.js";

const createLeaveType = async (req, res) => {
    try {
        const { name, defaultDays } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Leave type name is required"
            });
        }

        if (
            defaultDays !== undefined &&
            (Number.isNaN(Number(defaultDays)) || Number(defaultDays) < 0)
        ) {
            return res.status(400).json({
                success: false,
                message: "Default days must be a non-negative number"
            });
        }

        const existingType = await prisma.leaveType.findUnique({
            where: {
                name: name.trim()
            }
        });

        if (existingType) {
            return res.status(409).json({
                success: false,
                message: "Leave type already exists"
            });
        }

        const leaveType = await prisma.leaveType.create({
            data: {
                name: name.trim(),
                defaultDays:
                    defaultDays !== undefined
                        ? Number(defaultDays)
                        : null
            }
        });

        res.status(201).json({
            success: true,
            message: "Leave type created successfully",
            leaveType
        });

    } catch (error) {
        console.error("Error creating leave type:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create leave type"
        });
    }
};


const getLeaveTypes = async (req, res) => {
    try {
        const leaveTypes = await prisma.leaveType.findMany({
            orderBy: {
                name: "asc"
            }
        });

        res.json({
            success: true,
            leaveTypes
        });

    } catch (error) {
        console.error("Error fetching leave types:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leave types"
        });
    }
};

const createLeaveAllocation = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);
        const { leaveTypeId, allocatedDays, year } = req.body;

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        if (!leaveTypeId || allocatedDays === undefined || !year) {
            return res.status(400).json({
                success: false,
                message: "leaveTypeId, allocatedDays and year are required"
            });
        }

        if (Number(allocatedDays) < 0) {
            return res.status(400).json({
                success: false,
                message: "Allocated days cannot be negative"
            });
        }

        const employee = await prisma.employee.findUnique({
            where: { id: employeeId }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        const leaveType = await prisma.leaveType.findUnique({
            where: { id: Number(leaveTypeId) }
        });

        if (!leaveType) {
            return res.status(404).json({
                success: false,
                message: "Leave type not found"
            });
        }

        const existingAllocation = await prisma.leaveAllocation.findUnique({
            where: {
                employeeId_leaveTypeId_year: {
                    employeeId,
                    leaveTypeId: Number(leaveTypeId),
                    year: Number(year)
                }
            }
        });

        if (existingAllocation) {
            return res.status(409).json({
                success: false,
                message: "Leave allocation already exists for this year"
            });
        }

        const allocation = await prisma.leaveAllocation.create({
            data: {
                employeeId,
                leaveTypeId: Number(leaveTypeId),
                allocatedDays: Number(allocatedDays),
                year: Number(year)
            },
            include: {
                leaveType: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Leave allocation created successfully",
            allocation
        });

    } catch (error) {
        console.error("Error creating leave allocation:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create leave allocation"
        });
    }
};

const getLeaveAllocations = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const allocations = await prisma.leaveAllocation.findMany({
            where: {
                employeeId
            },
            include: {
                leaveType: true
            },
            orderBy: {
                year: "desc"
            }
        });

        res.json({
            success: true,
            allocations
        });

    } catch (error) {
        console.error("Error fetching leave allocations:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leave allocations"
        });
    }
};

const createLeaveRequest = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);
        const { leaveTypeId, startDate, endDate, reason, attachmentUrl } = req.body;

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        if (!leaveTypeId || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "leaveTypeId, startDate and endDate are required"
            });
        }

        const employee = await prisma.employee.findUnique({
            where: { id: employeeId }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        const leaveType = await prisma.leaveType.findUnique({
            where: {
                id: Number(leaveTypeId)
            }
        });

        if (!leaveType) {
            return res.status(404).json({
                success: false,
                message: "Leave type not found"
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (
            Number.isNaN(start.getTime()) ||
            Number.isNaN(end.getTime())
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid start or end date"
            });
        }

        if (end < start) {
            return res.status(400).json({
                success: false,
                message: "End date cannot be before start date"
            });
        }

        // Calculate inclusive number of calendar days.
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const days =
            Math.floor((end - start) / millisecondsPerDay) + 1;

        const year = start.getFullYear();

        const allocation = await prisma.leaveAllocation.findUnique({
            where: {
                employeeId_leaveTypeId_year: {
                    employeeId,
                    leaveTypeId: Number(leaveTypeId),
                    year
                }
            }
        });

        if (!allocation) {
            return res.status(400).json({
                success: false,
                message: "No leave allocation found for this employee and year"
            });
        }

        const remainingDays =
            Number(allocation.allocatedDays) -
            Number(allocation.usedDays);

        if (days > remainingDays) {
            return res.status(400).json({
                success: false,
                message: `Insufficient leave balance. Remaining days: ${remainingDays}`
            });
        }

        const leaveRequest = await prisma.leaveRequest.create({
            data: {
                employeeId,
                leaveTypeId: Number(leaveTypeId),
                startDate: start,
                endDate: end,
                days,
                reason: reason || null,
                attachmentUrl: attachmentUrl || null,
                status: "PENDING"
            },
            include: {
                leaveType: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Leave request submitted successfully",
            leaveRequest
        });

    } catch (error) {
        console.error("Error creating leave request:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create leave request"
        });
    }
};

const getLeaveRequests = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const requests = await prisma.leaveRequest.findMany({
            where: {
                employeeId
            },
            include: {
                leaveType: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json({
            success: true,
            requests
        });

    } catch (error) {
        console.error("Error fetching leave requests:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leave requests"
        });
    }
};

export {
    createLeaveType,
    getLeaveTypes,
    createLeaveAllocation,
    getLeaveAllocations,
    createLeaveRequest,
    getLeaveRequests
};