const mongoose = require("mongoose");

const connect= async ()=>{
   try {
    await mongoose.connect(process.env.DB_LINK);
    console.log("Connection Successfull with database");
   } catch (error) {
    console.log("Error in connecting with database" + error);
   }
}

module.exports = connect