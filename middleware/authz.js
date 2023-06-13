const authZ=async(req,res,next)=>{
    if(!req.user.faculty) return res.status(403).send('Access Denide ')
    next()
}
export default authZ;
