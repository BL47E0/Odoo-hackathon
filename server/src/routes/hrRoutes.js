import express from "express";
import { getEmployees } from "../controllers/hrController.js";

const router = express.Router();

router.get("/employees", getEmployees);

export default router;