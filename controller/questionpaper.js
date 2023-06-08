
import Question from "../model/qeustion.js";
export const createquestion = async (req, res) => {
    try {    
            let register = new Question({
            AssginmentId:req.query.AssginmentId,
            userId:req.body.userId,
            ques:req.body.ques,     
            writeAnswer:req.body.writeAnswer     
            })
        let st=await register.save()
        res.status(201).json({ message:" success",data: st});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const getQuestion = async (req, res) => {
    try {
      const view = await Question.find({userId:req.params.userId}).select("-ques.answer")
      console.log(view);
      res.status(200).json({ data: view });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
export const studentAnswer= async (req, res) => {
    try {
        let found = await Question.findOne({userId:req.params.userId})
        console.log(found);
        let uFam = await Question.findOneAndUpdate({ userId:req.params.userId }, { $push: {
         userId:req.body.userId,}, $set:{writeAnswer:req.body.writeAnswer}
        });
    //   console.log(uFam);
      res.status(200).json({ data: uFam });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
export const mark= async (req, res) => {
    let arr=[]
    let writer=[]
    try {
     let mark = await Question.find({ userId:req.params.userId })
  mark.map((i)=>{
    writer.push(i.writeAnswer)
    i.ques.map((j)=>{
       arr.push(j.answer)
    })
  })
console.log(arr);
console.log(writer);
   res.status(200).json({ data: mark });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
 