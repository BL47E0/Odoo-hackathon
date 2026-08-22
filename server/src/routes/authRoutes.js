import express from "express";
import { login } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

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

export default router;