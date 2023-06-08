import express from "express";
import {facultyreg, login, reg} from "../controller/student.js";

const router = express.Router();
router.post("/studentreg",reg)
router.post("/facltyreg",facultyreg)
router.post("/login",login)
export default router;