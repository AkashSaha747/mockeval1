let mongoose=require("mongoose");

let connection=()=>{
try{ mongoose.connect(process.env.MONGO_URL);
console.log("connnected to atlas db")
}
   catch(err){
    console.log("err connecting to db")
   }
}

module.exports={
    connection
}