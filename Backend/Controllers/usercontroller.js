const { usermodel } = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");

exports.registercontroller = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const existuser = await usermodel.findOne({ email });
    if (existuser) {
      return res.status(299).send({
        success: false,
        message: "User Already Exist",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new usermodel({ username, email, password: hashedpassword });
    await user.save();
    return res.status(202).send({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in user  register controller",
      error,
    });
  }
};

exports.logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(299).send({
        success: false,
        message: "User not found",
      });
    }
    const existuser = await usermodel.findOne({ email });
    const ismatch = await bcrypt.compare(password, existuser.password);
    if (!ismatch) {
      return res.status(299).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    const jwttoken = jwt.sign({ id: existuser._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    res.cookie(
      "token",
      jwttoken,
      {
        secure: true,
        httpOnly: true,
      },
      { maxAge: 3600000 }
    );

    return res.status(202).send({
      success: true,
      message: "User login successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in login Controller",
    });
  }
};

exports.logoutcontroller = async (req, res) => {
  try {
    const token = req.headers.cookie;

    res.status(202).send({
      success: true,
      message: "Logout Successfull",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in logout controller",
    });
  }
};
