
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../model/student.js' 
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
