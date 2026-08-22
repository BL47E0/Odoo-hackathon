import prisma from "../lib/prisma.js";

const getTodayDateIST = () => {
    const now = new Date();

    const ist = new Date(
        now.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata"
        })
    );

    ist.setHours(0, 0, 0, 0);

    return ist;
};

const checkIn = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
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

        const today = getTodayDateIST();

        const existingAttendance = await prisma.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId,
                    date: today
                }
            }
        });

        if (existingAttendance?.checkIn) {
            return res.status(400).json({
                success: false,
                message: "Employee has already checked in today"
            });
        }

        const attendance = existingAttendance
            ? await prisma.attendance.update({
                where: {
                    id: existingAttendance.id
                },
                data: {
                    checkIn: new Date(),
                    status: "PRESENT"
                }
            })
            : await prisma.attendance.create({
                data: {
                    employeeId,
                    date: today,
                    checkIn: new Date(),
                    status: "PRESENT"
                }
            });

        res.json({
            success: true,
            message: "Check-in successful",
            attendance
        });

    } catch (error) {
        console.error("Error during check-in:", error);

        res.status(500).json({
            success: false,
            message: "Failed to check in"
        });
    }
};


const checkOut = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const today = getTodayDateIST();

        const attendance = await prisma.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId,
                    date: today
                }
            }
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "No attendance record found for today"
            });
        }

        if (!attendance.checkIn) {
            return res.status(400).json({
                success: false,
                message: "Employee has not checked in today"
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                success: false,
                message: "Employee has already checked out today"
            });
        }

        const checkOutTime = new Date();

        const workHours =
            (checkOutTime.getTime() - attendance.checkIn.getTime()) /
            (1000 * 60 * 60);

        const roundedWorkHours = Number(workHours.toFixed(2));

        const updatedAttendance = await prisma.attendance.update({
            where: {
                id: attendance.id
            },
            data: {
                checkOut: checkOutTime,
                workHours: roundedWorkHours,
                status: "PRESENT"
            }
        });

        res.json({
            success: true,
            message: "Check-out successful",
            attendance: updatedAttendance
        });

    } catch (error) {
        console.error("Error during check-out:", error);

        res.status(500).json({
            success: false,
            message: "Failed to check out"
        });
    }
};
const getTodayAttendance = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const today = getTodayDateIST();

        const attendance = await prisma.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId,
                    date: today
                }
            }
        });

        res.json({
            success: true,
            attendance: attendance || null
        });

    } catch (error) {
        console.error("Error fetching today's attendance:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch today's attendance"
        });
    }
};

const getAttendanceHistory = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
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

        const attendance = await prisma.attendance.findMany({
            where: {
                employeeId
            },
            orderBy: {
                date: "desc"
            }
        });

        res.json({
            success: true,
            attendance
        });

    } catch (error) {
        console.error("Error fetching attendance history:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance history"
        });
    }
};

export {
    checkIn,
    checkOut,
    getTodayAttendance,
    getAttendanceHistory
};