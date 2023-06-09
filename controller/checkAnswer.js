import Answer from "../model/answer.js";

export const createAll = async (req, res) => {
    try {    
            let reg = new Answer({
                userId:req.body.userId,
                AssginmentId:req.body.AssginmentId,
                QuestionpaperId:req.body.QuestionpaperId,
            })
       let view= await reg.save()
        res.status(201).json({ message: " Assgniment add" ,st:view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
