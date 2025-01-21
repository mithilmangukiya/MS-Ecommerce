const mongoose=require("mongoose");

const connectmongoDB=async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("MongoDB Connected!");})
    .catch((err)=>{console.log(err);})
}

module.exports=connectmongoDB;  