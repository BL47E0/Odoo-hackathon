import express from "express";
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    createSalaryStructure,
    updateSalaryStructure,
    addSalaryComponent,
    getSalaryStructure,
    getPayroll
} from "../controllers/hrController.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.post("/employees/:id/salary", createSalaryStructure);
router.post(
    "/employees/:id/salary/components",
    addSalaryComponent
);
router.get("/employees/:id/salary", getSalaryStructure);
router.get("/employees/:id/payroll", getPayroll);
router.put("/employees/:id/salary", updateSalaryStructure);
export default router;