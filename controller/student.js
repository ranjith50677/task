import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/student.js";
import dotenv from "dotenv";
import Answer from "../model/answer.js";
import Question from "../model/qeustion.js";
import Assginment from "../model/assginment.js";

dotenv.config();
export const reg = async (req, res) => {
  const saltRounds = 10;
  let email = req.body.email
  let cls =req.body.class
  let exUserEmail = await User.findOne({ email: email });
  if (exUserEmail) return res.json({ message: "email already register" });
  if(!cls) return res.status(400).json({ message: " pls enter cls" })
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      let register = new User({
        name: req.body.name,
        class:cls,
        email: email,
        password: hash,
      });
      await register.save();
      res.status(201).json({ message: " register success" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const facultyreg = async (req, res) => {
  const saltRounds = 10;
  let email = req.body.email;
  let exUserEmail = await User.findOne({ email: email });
  if (exUserEmail) return res.json({ message: "email already register" });
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      let register = new User({
        name: req.body.name,
        email: email,
        password: hash,
        faculty: true,
      });
      await register.save();
      res.status(201).json({ message: "register success" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  let email = req.body.email;
  let foundUser = await User.findOne({ email: email });
  // let password=req.body.password
  if (!foundUser)
    return res.status(400).json({ message: "your are not active user" });
  bcrypt.compare(req.body.password, (err, result) => {
    try {
      const token = jwt.sign({ id: foundUser._id }, process.env.JWT, {
        expiresIn: "12h",
      });
      res
        .header("token", token)
        .json({ message: "login successfully", token: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

// anser write
export const WriteAnswer = async (req, res) => {
  let userId = req.query.userId;
  let QuestionpaperId = req.query.QuestionpaperId;
  let user= await User.findById({_id:userId})
  // console.log(user)
  let sub= await Assginment.findById({_id: req.query.AssginmentId})
  let fou=await Answer.findOne({userId:userId,QuestionpaperId:QuestionpaperId})
  // console.log(fou.AssginmentId.subject);
  if(fou) return  res.status(400).json({ message: "already attended this assignment" });
  let foundQueAns = await Question.findOne({ _id: QuestionpaperId })
  // console.log(foundQueAns);
  try {
    let reg = new Answer({
      name:user.name,
      class:user.class,
      subject:sub.subject,
      userId: userId,
      AssginmentId: req.query.AssginmentId,
      QuestionpaperId: QuestionpaperId,
      AnswerSheet: req.body.AnswerSheet,
      Attend: req.body.Attend,
    });
    let view = await reg.save();
    let stdAnswer = req.body.AnswerSheet;
    let count = 0;
    foundQueAns.ques.map((ques,index)=>{
      if(ques.answer?.trim() == stdAnswer[index].Answer?.trim()){
        count=count+1;
      }
    })
    // console.log(score);
    await Answer.findByIdAndUpdate({ _id: view._id }, { totalMark: count });
    res.status(201).json({ message: "Attended", st: view });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const NotAttentingStudent = async (req, res) => {
  let userId = req.body.userId;
  let QuestionpaperId = req.body.QuestionpaperId;
  let user= await User.findById({_id:userId})
  // console.log(user)
  let sub= await Assginment.findById({_id: req.body.AssginmentId})
  let fou=await Answer.findOne({userId:userId,QuestionpaperId:QuestionpaperId});
  if(fou) return  res.status(400).json({ message: "already attended this assignment" });
  // console.log(foundQueAns);
  try {
    let notatten = new Answer({
      userId: userId,
      AssginmentId: req.body.AssginmentId,
      QuestionpaperId: QuestionpaperId,
      AnswerSheet: req.body.AnswerSheet,
      name:user.name,
      class:user.class,
      subject:sub.subject,
      Attend: "Not Attented",
      totalMark:0
    });
  await notatten.save();
  res.status(200).json({ message: "Not attented Student" });
  }
    
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  
};
export const totalMark = async (req, res) => {
  let arr = [];
  let writeAns = [];

  try {
    let found = await Answer.find({
      userId: req.query.userId,
      AssginmentId: req.query.AssginmentId,
    }).populate("QuestionpaperId");
    console.log(found);
    console.log("found");
    found.map((i) => {
      i.AnswerSheet.map((j) => {
        //         // console.log(j.Answer);
        writeAns.push(j.Answer);
      });
      i.QuestionpaperId.ques.map((k) => {
        arr.push(k.answer);
      });
    });
    console.log(arr, writeAns);
    let count = 0;
    let totalMark = 0;
    let score = 0;
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] == writeAns[index]) {
        score += 1;
      }
    }
    console.log(score);
    arr.map((i) => {
      writeAns.map((j) => {
        // console.log(j);
        if (i == j) {
          count = count + 1;
          totalMark = count;
          console.log(count);
        }
      });
    });
    // console.log("mass", writeAns);
    let uFam = await Answer.findOneAndUpdate(
      { userId: req.query.userId },
      { $set: { totalMark: totalMark } }
    );
    //  console.log(uFam);
    res.status(200).json({ data: uFam });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Attende = async (req, res) => {
  try {
    const view = await Answer.find({ Attend: req.query.Attend })
      .select("-AnswerSheet")
      .select("-AssginmentId")
      .select("-QuestionpaperId")
      .populate("userId");
    res.status(200).json({ data: view });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const test= async (req, res) => {
  try {
    const view = await Answer.find({ Attend: req.query.Attend,userId:req.query.userId })
      .populate("AssginmentId")
      .populate("QuestionpaperId")
      .populate("userId");
    res.status(200).json({ data: view });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

