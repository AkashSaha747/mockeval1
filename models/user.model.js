let mongoose=require("mongoose");
let userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

let Usermodel=mongoose.model("user",userschema);


module.exports={
    Usermodel
}