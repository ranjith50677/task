import express from "express";
import {Attende, WriteAnswer, facultyreg, login, reg, totalMark} from "../controller/student.js";
import { createAssginment, getAssignment } from "../controller/Assginment.js";
import { createquestion, getAll, getQuestion } from "../controller/questionpaper.js";
import auth from "../middleware/auth.js";
import authZ from "../middleware/authz.js"
import pdfService from "../controller/craetepdf.js"


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
router.get("/attende",[auth,authZ],Attende)
// router.put("/totalMark",[auth,authZ],totalMark)
// pdf download
router.get('/invoice', (req, res, next) => {
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment;filename=invoice.pdf`,
    });
    pdfService(
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  });


export default router;