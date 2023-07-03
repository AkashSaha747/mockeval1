let mongoose=require("mongoose");

const date = new Date();

let employeeschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required :true
    },
    email:{
        type:String,
       required:true,
    },
    department:{
        type:String,
        enum:["tech","marketing","operations"],
        default:"tech"
    },
    salary:{
type:Number,
required:true
    },

    date: {
        type:String,
        default: date.getTime().toString()
    },

    employeeID:{
        type:String
    }
})

let Employeemodel=mongoose.model("employee",employeeschema);

module.exports={
    Employeemodel
}