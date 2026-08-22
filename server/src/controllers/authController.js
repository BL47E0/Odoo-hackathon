import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const login = async (req, res) => {
    try {
        const { email, loginId, password } = req.body;

        if ((!email && !loginId) || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or login ID and password are required"
            });
        }

        let user;

        if (loginId) {
            const employee = await prisma.employee.findUnique({
                where: {
                    employeeId: loginId.trim().toUpperCase()
                },
                include: {
                    user: true
                }
            });

            if (employee) {
                user = employee.user;
            }
        } else {
            user = await prisma.user.findUnique({
                where: {
                    email: email.trim().toLowerCase()
                }
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login ID/email or password"
            });
        }

        const passwordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid login ID/email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        const employee = await prisma.employee.findUnique({
            where: {
                userId: user.id
            },
            select: {
                id: true,
                employeeId: true,
                firstName: true,
                lastName: true
            }
        });

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                employee
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 8 characters long"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const passwordValid = await bcrypt.compare(
            currentPassword,
            user.passwordHash
        );

        if (!passwordValid) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                id: req.user.userId
            },
            data: {
                passwordHash: newPasswordHash
            }
        });

        res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error("Change password error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to change password"
        });
    }
};

export {
    login,
    changePassword
};