const authZ=async(req,res,next)=>{
    console.log(req.user);
    if(!req.user.faculty) return res.status(403).send('Access Denide ')
    next()
}
export default authZ;
