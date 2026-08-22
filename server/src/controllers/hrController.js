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

const createSalaryStructure = async (req, res) => {
    try {
        const employeeId = Number(req.params.id);
        const { baseSalary } = req.body;

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        if (baseSalary === undefined || Number(baseSalary) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Base salary must be greater than 0"
            });
        }

        // Check employee exists
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Check whether salary structure already exists
        const existingSalary = await prisma.salaryStructure.findUnique({
            where: { employeeId }
        });

        if (existingSalary) {
            return res.status(409).json({
                success: false,
                message: "Salary structure already exists for this employee"
            });
        }

        const salary = await prisma.salaryStructure.create({
            data: {
                employeeId,
                baseSalary: Number(baseSalary)
            },
            include: {
                employee: {
                    select: {
                        employeeId: true,
                        firstName: true,
                        lastName: true,
                        department: true,
                        designation: true
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: "Salary structure created successfully",
            salary
        });

    } catch (error) {
        console.error("Error creating salary structure:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create salary structure"
        });
    }
};

const addSalaryComponent = async (req, res) => {
    try {
        const employeeId = Number(req.params.id);
        const {
            name,
            calculationType,
            value
        } = req.body;

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        if (!name || !calculationType || value === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, calculation type and value are required"
            });
        }

        if (!["FIXED", "PERCENTAGE"].includes(calculationType)) {
            return res.status(400).json({
                success: false,
                message: "Calculation type must be FIXED or PERCENTAGE"
            });
        }

        if (Number(value) < 0) {
            return res.status(400).json({
                success: false,
                message: "Component value cannot be negative"
            });
        }

        // Find employee
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                salary: true
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        if (!employee.salary) {
            return res.status(404).json({
                success: false,
                message: "Salary structure not found for this employee"
            });
        }

        // Find or create the reusable salary component
        let component = await prisma.salaryComponent.findUnique({
            where: { name }
        });

        if (!component) {
            component = await prisma.salaryComponent.create({
                data: {
                    name,
                    calculationType,
                    defaultValue: Number(value)
                }
            });
        }

        // Check if this component is already assigned
        const existing = await prisma.employeeSalaryComponent.findUnique({
            where: {
                salaryStructureId_componentId: {
                    salaryStructureId: employee.salary.id,
                    componentId: component.id
                }
            }
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "This salary component is already assigned to the employee"
            });
        }

        const employeeComponent =
            await prisma.employeeSalaryComponent.create({
                data: {
                    salaryStructureId: employee.salary.id,
                    componentId: component.id,
                    value: Number(value)
                },
                include: {
                    component: true
                }
            });

        res.status(201).json({
            success: true,
            message: "Salary component added successfully",
            component: employeeComponent
        });

    } catch (error) {
        console.error("Error adding salary component:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add salary component"
        });
    }
};

const getSalaryStructure = async (req, res) => {
    try {
        const employeeId = Number(req.params.id);

        if (Number.isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const salary = await prisma.salaryStructure.findUnique({
            where: {
                employeeId
            },
            include: {
                employee: {
                    select: {
                        employeeId: true,
                        firstName: true,
                        lastName: true,
                        department: true,
                        designation: true
                    }
                },
                components: {
                    include: {
                        component: true
                    }
                }
            }
        });

        if (!salary) {
            return res.status(404).json({
                success: false,
                message: "Salary structure not found"
            });
        }

        const baseSalary = Number(salary.baseSalary);

        const components = salary.components.map((item) => {
            const value = Number(item.value);

            const calculatedAmount =
                item.component.calculationType === "PERCENTAGE"
                    ? (baseSalary * value) / 100
                    : value;

            return {
                id: item.id,
                name: item.component.name,
                calculationType: item.component.calculationType,
                value,
                calculatedAmount
            };
        });

        const allowances = components
            .filter((component) =>
                !["PF", "TAX", "DEDUCTION"].includes(
                    component.name.toUpperCase()
                )
            )
            .reduce(
                (total, component) =>
                    total + component.calculatedAmount,
                0
            );

        const deductions = components
            .filter((component) =>
                ["PF", "TAX", "DEDUCTION"].includes(
                    component.name.toUpperCase()
                )
            )
            .reduce(
                (total, component) =>
                    total + component.calculatedAmount,
                0
            );

        const grossSalary = baseSalary + allowances;
        const netSalary = grossSalary - deductions;

        res.json({
            success: true,
            salary: {
                id: salary.id,
                effectiveFrom: salary.effectiveFrom,
                employee: salary.employee,
                baseSalary,
                components,
                allowances,
                deductions,
                grossSalary,
                netSalary
            }
        });

    } catch (error) {
        console.error("Error fetching salary structure:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch salary structure"
        });
    }
};


export {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    createSalaryStructure,
    addSalaryComponent,
    getSalaryStructure
};