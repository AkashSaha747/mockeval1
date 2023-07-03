let jwt=require("jsonwebtoken");
let authenticate =async (req,res,next)=>{
let token =req.headers?.authorization?.split(" ")[1];
// console.log(token);
if(token){
    // console.log(process.env.SECRET_KEY)
let decode=jwt.verify(token,process.env.SECRET_KEY);
        if(decode){
req.employeeID=decode.employeeID;

next();
}else{
    res.send({msg:"Token not valid"});
}}
else{

    res.send({msg:"please give token"})
}
}

module.exports={
    authenticate
}