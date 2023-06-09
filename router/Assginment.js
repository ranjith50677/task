import express from "express";
import { createAssginment, get, getAssignment} from "../controller/Assginment.js"
const router = express.Router();
router.post("/creatassginment",createAssginment)
router.get("/getAllAssignment",getAssignment)
router.get("/get/:userId",get)

export default router;