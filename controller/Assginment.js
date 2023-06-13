import Assginment from "../model/assginment.js";

export const createAssginment = async (req, res) => {
  let AssginmentName=req.body.AssginmentName;
  let Assginmenttype=req.body.Assginmenttype
  let exname = await Assginment.findOne({ AssginmentName: AssginmentName });
  let unit = await Assginment.findOne({ Assginmenttype: Assginmenttype });
  if (exname) return res.json({ message: "Assginment Alredy create" });
   if (unit) return res.json({ message: "Assginment Alredy create" });
    try {    
            let reg = new Assginment({
                AssginmentName:AssginmentName,
                Assginmenttype:Assginmenttype,
                subject:req.body.subject,
            })
       let view= await reg.save()
        res.status(201).json({ message: " Assgniment add" ,st:view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAssignment= async (req, res) => {
    
    try {
      const view = await Assginment.find()
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
