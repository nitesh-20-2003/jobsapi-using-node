const express=require('express');
const router=express.Router()
const{  GetAllJobs,getjob,createjob,UpdateJOb,DeleteJob}=require('../controls/jobs');
const { get } = require('https');
router.route('/').post(createjob).get(GetAllJobs);
router.route("/:id").get(getjob).delete(DeleteJob).patch(UpdateJOb);
module.exports=router;