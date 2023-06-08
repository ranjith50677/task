import express from "express";
import {WriteAnswer, facultyreg, login, reg, totalMark} from "../controller/student.js";

const router = express.Router();
router.post("/studentreg",reg)
router.post("/facltyreg",facultyreg)
router.post("/login",login)
router.post("/Answer",WriteAnswer)
router.put("/totall",totalMark)
export default router;