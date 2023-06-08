
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../model/student.js' 
import Answer from '../model/answer.js' 
import dotenv from "dotenv";

dotenv.config();
export const reg = async (req, res) => {
    const saltRounds = 10;
    let email=req.body.email
    let password=req.body.password
    let exUserEmail = await User.findOne({ email: email });
    let exUserpassword = await User.findOne({ password: password });
    if (exUserEmail) return res.json({ message: "email already register" });
    if (exUserpassword) return res.json({ message: "password already register" });
    try {    
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            let register = new User({
            name:req.body.name,
            email:email,
            password:hash,
            })
        await register.save()
        res.status(201).json({ message: " register success" });
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const facultyreg = async (req, res) => {
  const saltRounds = 10;
  let email=req.body.email
  // let password=req.body.password
  let exUserEmail = await User.findOne({ email: email });
  // let exUserpassword = await User.findOne({ password: password });
  if (exUserEmail) return res.json({ message: "email already register" });
  // if (exUserpassword) return res.json({ message: "password already register" });
  try {    
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          let register = new User({
          name:req.body.name,
          email:email,
          password:hash,
          faculty:true
          })
      await register.save()
      res.status(201).json({ message: "register success" });
      })
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

export const login= async (req, res) => {
    let email = req.body.email
    let foundUser = await User.findOne({ email: email }); 
    // let password=req.body.password  
    if(!foundUser) return res.status(400).json({ message: "your are not active user" }); 
    bcrypt.compare(req.body.password,(err, result) => {
          try {
            const token = jwt.sign({ id:foundUser._id }, process.env.JWT, {
              expiresIn: "12h",
            });
            res.header("token", token).json({ message: "login successfully", token: token });
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
      })
}


export const WriteAnswer = async (req, res) => {
let userId=req.body.userId;
let AssginmentId=req.body.userId;
let foundUser = await Answer.findOne({ AssginmentId: AssginmentId }); 
// console.log(foundUser);
if(foundUser) return res.status(400).json({ message: "your alredy attend" });

  try {  
          let reg = new Answer({
            userId:userId,
            AssginmentId:AssginmentId,
            QuestionpaperId:req.body.QuestionpaperId,
            write:req.body.write,
              // questionId:req.body
          })

     let view= await reg.save()
      res.status(201).json({ message: "Attende" ,st:view });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

export const totalMark= async (req, res) => {
  let arr=[];
  let writeAns=[];
  
  try {
      let found = await Answer.find({userId:req.query.userId}).populate("QuestionpaperId")
    // console.log(found);
      found.map((i)=>{
        i.write.map((j)=>{
          // console.log(j.Answer);
         writeAns.push(j.Answer);
        })
    i.QuestionpaperId.ques.map((k)=>{
    arr.push(k.answer);
   })
    })

    let count=0;
    let totalMark=0;

    arr.map((i)=>{
      console.log(i);
      writeAns.map((j)=>{
        if(i==j){
          count=count+1;
          totalMark=count;
          console.log(count);
        }
      })
    })
       let uFam = await Answer.findOneAndUpdate({ userId:req.query.userId }, { $set:{totalMark:totalMark}
      });
    //  console.log(uFam);
    res.status(200).json({ data: uFam });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};