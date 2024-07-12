const {StatusCodes} = require('http-status-codes');
const Job=require('../models/jobs');
const user = require('../models/user');
const {Unauthenticateerror, Badrequest}=require('../errors')
const GetAllJobs=async(req,res)=>{
 const jobs= await Job.find({createdBy:req.user.userid.userId}).sort('createdAt');
 res.status(StatusCodes.OK).json({jobs});
}
const getjob=async(req,res)=>{//single job
  const { userid} = req.user;
  const {params}=req;
const Id=userid.userId;
console.log(params.id);
try {
  const job= await Job.findOne({createdBy:Id,_id:params.id})
  console.log(job);
} catch (error) {
res.send(error)
}
res.send(job);
}
const createjob = async (req, res, next) => {
  const { userid } = req.user;
  const { body } = req;

  body.createdBy = userid.userId;
  console.log(body);

  try {
    const job = await Job.create(body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
const UpdateJOb=async(req,res)=>{
 const {
  body:{
    company,postion
  },
user:{userid:{userId}},
params:{id:jobid},


 }=req
 if(company===''|postion===''){
  throw new Badrequest('compay or postion cannot be empty')
}
const job =await Job.findByIdAndUpdate({_id:jobid,createdBy:userId},req.body,{new:true,runValidator:true});
console.log(job);
res.send(job)
}
const DeleteJob=async(req,res)=>{
  const {
    body:{
      company,postion
    },
  user:{userid:{userId}},
  params:{id:jobid},
  
  
   }=req;
   if(company===''||postion===''){
    throw Badrequest("please provide valid credentiasl");
   }
   const job= await Job.findByIdAndDelete({_id:jobid});
   res.send(job)
}
module.exports={
  GetAllJobs,getjob,createjob,UpdateJOb,DeleteJob
}