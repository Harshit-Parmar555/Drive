const express = require("express");
const userrouter = express.Router();
const {registercontroller,logincontroller , logoutcontroller} = require("../Controllers/usercontroller")

userrouter.post("/userregister" , registercontroller);
userrouter.post("/userlogin" , logincontroller );
userrouter.get("/userlogout" , logoutcontroller);

module.exports = {userrouter}
