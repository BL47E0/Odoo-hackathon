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

export { getEmployees };