import prisma from "../lib/prisma.js";

const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        role: true
                    }
                }
            },
            orderBy: {
                employeeId: "asc"
            }
        });

        res.json({
            success: true,
            employees
        });
    } catch (error) {
        console.error("Error fetching employees:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch employees"
        });
    }
};



const getEmployeeById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const employee = await prisma.employee.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true
                    }
                },
                privateInfo: true,
                skills: true,
                certifications: true,
                salary: {
                    include: {
                        components: {
                            include: {
                                component: true
                            }
                        }
                    }
                }
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.json({
            success: true,
            employee
        });

    } catch (error) {
        console.error("Error fetching employee:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch employee"
        });
    }
};

const createEmployee = async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            phone,
            address,
            department,
            designation,
            company,
            joiningDate
        } = req.body;

        // Required fields
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "Email, password, first name and last name are required"
            });
        }

        // Check whether email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const bcrypt = await import("bcrypt");
        const passwordHash = await bcrypt.hash(password, 10);

        // Generate employee ID
        const year = joiningDate
            ? new Date(joiningDate).getFullYear()
            : new Date().getFullYear();

        const initials =
            firstName.substring(0, 2).toUpperCase() +
            lastName.substring(0, 2).toUpperCase();

        const employeeCount = await prisma.employee.count({
            where: {
                joiningDate: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year + 1}-01-01`)
                }
            }
        });

        const serialNumber = String(employeeCount + 1).padStart(4, "0");

        const employeeId = `${initials}${year}${serialNumber}`;

        // Create User + Employee together
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role: "EMPLOYEE"
                }
            });

            const employee = await tx.employee.create({
                data: {
                    userId: user.id,
                    employeeId,
                    firstName,
                    lastName,
                    phone,
                    address,
                    department,
                    designation,
                    company,
                    joiningDate: joiningDate
                        ? new Date(joiningDate)
                        : null
                },
                include: {
                    user: {
                        select: {
                            email: true,
                            role: true
                        }
                    }
                }
            });

            return employee;
        });

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            employee: result
        });

    } catch (error) {
        console.error("Error creating employee:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create employee"
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const {
            firstName,
            lastName,
            phone,
            address,
            department,
            designation,
            company,
            joiningDate
        } = req.body;

        // Check that the employee exists
        const existingEmployee = await prisma.employee.findUnique({
            where: { id }
        });

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        const employee = await prisma.employee.update({
            where: { id },
            data: {
                ...(firstName !== undefined && { firstName }),
                ...(lastName !== undefined && { lastName }),
                ...(phone !== undefined && { phone }),
                ...(address !== undefined && { address }),
                ...(department !== undefined && { department }),
                ...(designation !== undefined && { designation }),
                ...(company !== undefined && { company }),
                ...(joiningDate !== undefined && {
                    joiningDate: joiningDate ? new Date(joiningDate) : null
                })
            },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true
                    }
                }
            }
        });

        res.json({
            success: true,
            message: "Employee updated successfully",
            employee
        });

    } catch (error) {
        console.error("Error updating employee:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update employee"
        });
    }
};

export {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee
};