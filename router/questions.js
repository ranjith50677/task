import express from "express";
import {createquestion, getQuestion, mark, studentAnswer} from "../controller/questionpaper.js";

const router = express.Router();
router.post("/reg",createquestion)
router.get("/getquestion/:userId",getQuestion)
router.put("/getstudent/:userId",studentAnswer)
router.get("/mark/:userId",mark)

export default router;