import express from "express";
import {createAll, get, getAssignment} from "../controller/Assginment.js"
const router = express.Router();
router.post("/creatAll",createAll)
router.get("/getAssginmenstuden",getAssignment)
router.get("/get/:userId",get)

export default router;