
import Question from "../model/qeustion.js";
export const createquestion = async (req, res) => {
  let AssginmentId=req.query.AssginmentId;
  // let Assginmenttype=req.body.Assginmenttype
  let exId = await Question.findOne({ AssginmentId: AssginmentId });
  // let unit = await Question.findOne({ Assginmenttype: Assginmenttype });
  if (exId) return res.json({ message: "Assginment Alredy add" });
  //  if (unit) return res.json({ message: "Assginment Alredy create" });
    try {    
            let register = new Question({
            AssginmentId:req.query.AssginmentId,
            userId:req.body.userId,
             ques:req.body.ques,     
             totaltestMark:req.body.totaltestMark,     
            })
        let st=await register.save()
        res.status(201).json({ message:" success",data: st});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAll = async (req, res) => {
    try {
      const view = await Question.find().select("-ques.answer")
      res.status(200).json({ data: view });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
export const getQuestion = async (req, res) => {
  let AssginmentId=req.query.AssginmentId;
    try {
      const view = await Question.find({userId:req.query.userId,AssginmentId}).select("-ques.answer")
      console.log(view);
      res.status(200).json({ data: view });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

