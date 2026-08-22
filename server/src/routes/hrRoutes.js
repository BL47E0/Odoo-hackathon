import express from "express";
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee
} from "../controllers/hrController.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
export default router;