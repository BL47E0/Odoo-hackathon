import express from "express";

import {
    getEmployees,
    getEmployeeById,
    createEmployee
} from "../controllers/hrController.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);

export default router;