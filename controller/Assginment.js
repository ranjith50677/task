import Assginment from "../model/assginment.js";
export const createAll = async (req, res) => {
    try {    
            let reg = new Assginment({
                AssginmentName:req.body.AssginmentName,
                Assginmenttype:req.body.Assginmenttype,
                subject:req.body.subject,
                // questionId:req.body
            })
       let view= await reg.save()
        res.status(201).json({ message: " Assgniment add" ,st:view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAssignment= async (req, res) => {
    
    try {
      const view = await Assginment.find().populate("questionId")
      res.status(200).json({ data: view });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
export const get= async (req, res) => {
    try {
      const view = await Assginment.find({userId:req.params.userId}).populate("questionId")
      res.status(200).json({ data: view });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
