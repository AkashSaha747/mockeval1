require("dotenv").config();
let express=require("express");
const { connection } = require("./configs/db");
let cors=require("cors")

const { authenticate } = require("./middleware/authenticate");
const { authorization } = require("./middleware/authorization");

let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
const { Usermodel } = require("./models/user.model");
const {Employeemodel} =require("./models/employee.model");



let app=express();
app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
    res.send({msg:"home"})
})


// signup done
app.post("/signup",async(req,res)=>{
    let {email,password}=req.body
    let current_user=await Usermodel.findOne({email})
if(current_user){
    res.send({msg:"already present pls login"})
}  
else{
try{
        let hash=bcrypt.hashSync(password,4);
await Usermodel.create({email,password:hash})
res.send({msg:"sign up success"})        
    }catch(err){
        res.send({msg:"error to sign up"})
    }
}
})

// lognin done
app.post("/login",async(req,res)=>{
let {email,password}=req.body;
let emp=await Usermodel.findOne({email});
if(emp){
    // console.log(emp)
try{
let userpass=emp.password;
let match=bcrypt.compareSync(password,userpass);
if(match){
    let token=jwt.sign({employeeID:emp._id},process.env.SECRET_KEY);
    res.send({msg:"login success",token})
}else{
    res.send({msg:"invalid credentials"})
}
}catch(err){
    res.send({msg:"login failed"})
}
}else{
    res.send({msg:"sign up first"});
}

})

// create employee data done
app.post("/create/employee",authenticate,async(req,res)=>{
    let {firstName,lastName,email,department,salary}=req.body;
    console.log(req.employeeID)
        await Employeemodel.create({firstName,lastName,email,department,salary,employeeID:req.employeeID})
        res.send({msg:"employee created"})
})

// delete employee data done
app.delete("/delete/employee/:employeeID",authenticate,authorization,async(req,res)=>{
    let {employeeID}=req.params;

    try{
        let empdata=await Employeemodel.findOne({_id:employeeID});
        console.log(empdata)
        if(empdata.firstName){
            await Employeemodel.findByIdAndDelete({_id:employeeID})
            res.send({msg:"employee data deleted"})
        }else{
            res.send({msg:"employee data not found"})
        }
    
    }catch(Err){
res.send({msg:"error in delete"})
    }
})

// get all data
app.get("/employees",async(req,res)=>{
    let data=await Employeemodel.find();
    res.send({msg:"here are data",data:data});
})














app.listen(process.env.PORT,()=>{
    connection()
    console.log("listening at port 8080")
})