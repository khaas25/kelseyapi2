const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/kelseyapi2").then((res)=>{
    console.log("Connected to MongoDB");
}).catch((e)=>{
    console.log(e);
})