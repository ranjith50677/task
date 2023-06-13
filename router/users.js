import express from "express";
import {Attende, NotAttentingStudent, WriteAnswer, facultyreg, login, reg, test, totalMark} from "../controller/student.js";
import { createAssginment, getAssignment } from "../controller/Assginment.js";
import { createquestion, getAll, getQuestion } from "../controller/questionpaper.js";
import auth from "../middleware/auth.js";
import authZ from "../middleware/authz.js"
import { Report, chart, chartpdf, classtable, markwise, subchart, subject,} from "../controller/craetepdf.js"
import createPdf from "../controller/craetepdf.js";


const router = express.Router();
router.post("/studentreg",reg)
router.post("/facltyreg",facultyreg)
router.post("/login",login)

// assganiment create
router.post("/creatassginment",[auth,authZ], createAssginment)
router.post("/reg",[auth,authZ],createquestion)

//view All assgnimnet
router.get("/getAllAssignment",[auth,authZ],getAssignment)
router.get("/allass&question",[auth,authZ],getAll)
//particluar assignment and question get
router.get("/getquestion",getQuestion)

// write the answer'
router.post("/writeanswer",WriteAnswer)
router.post("/notattenting",[auth,authZ],NotAttentingStudent)
router.get("/attende",[auth,authZ],Attende)
// router.put("/totalMark",[auth,authZ],totalMark)
// pdf download
  router.post('/pdf',[auth,authZ],createPdf)
  router.get('/chart',[auth,authZ],chartpdf)
//particluar student report && particluar student attent 
router.get('/test',[auth,authZ],test)
router.post('/particularpdf/:userId',[auth,authZ],Report)
router.post('/particularchart',[auth,authZ],chart)
//table subject and  class
router.get('/subtable',[auth,authZ],subject)
router.get('/clstable',[auth,authZ],classtable)
//chart
router.get('/subchart',[auth,authZ],subchart)
//mark wise report 
router.get('/markwise',[auth,authZ],markwise)




export default router;