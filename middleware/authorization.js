const { Employeemodel } = require("../models/employee.model");

let authorization=async(req,res,next)=>{

    let {employeeID}=req.params;
    let emp=await Employeemodel.findOne({_id:employeeID});
    let empOwner=emp.employeeID;

    if(empOwner==req.employeeID){
        next();
    }else{
        res.send({msg:"you are not authorised"})
    }
}

module.exports={
    authorization
}