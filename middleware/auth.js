import jwt from 'jsonwebtoken'
import User from '../model/student.js';

async function auth(req,res,next){
    const token=req.header('token')  
    console.log(token);
    if(!token) return res.status(403).json({message:"forbidden - token is unavailable"}) 
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        let user = await User.findById({_id:req.user.id}) 
        // console.log(user);
        req.user={...req.user,faculty:user.faculty}
        // console.log(req.user);
        // console.log("mass");
        next(); 
    } catch (error) { 
        res.status(401).json({message:error.message})
    }
}

export default auth;