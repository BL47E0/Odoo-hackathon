import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
    login,
    changePassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.get("/me", authenticate, (req, res) => {
    res.json({
        success: true,
        message: "Authentication successful",
        user: req.user
    });
});

router.get(
    "/hr-test",
    authenticate,
    authorize("HR", "ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "HR authorization successful",
            user: req.user
        });
    }
);

router.put("/change-password", authenticate, changePassword);

export default router;