const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { usermodel } = require("../Models/usermodel");
const { documentmodel } = require("../Models/documentmodel");
const { app } = require("../utils/firebase");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

exports.alldocument = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(299).send({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.id = decoded.id;
    } catch (error) {
      return res.status(299).send({
        success: false,
        message: "Un-Authorized",
      });
    }
    const id = req.id;
    const user = await usermodel.findById(id).populate("documents");
    const files = user.documents;
    return res.status(202).send({
      success: true,
      message: "Documents Found",
      files,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in All documents Controller",
    });
  }
};

exports.adddocument = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(299).send({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.id = decoded.id;
    } catch (error) {
      return res.status(299).send({
        success: false,
        message: "Un-Authorized",
      });
    }
    const id = req.id;
    const existuser = await usermodel.findById(id);
    if (!existuser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const { filename, filepath } = req.body;
    if (!filename || !filepath) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const date = new Date();
    const time = date.getTime();
    const modifiedpath = time + filepath;
    const storage = getStorage(app);
    const storageref = ref(storage, "images/" + modifiedpath);
    await uploadBytes(storageref, filepath);
    const downloadurl = await getDownloadURL(storageref);

    const newdocument = new documentmodel({
      documentname: filename,
      documentlink: downloadurl,
      user: id,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newdocument.save({ session });
    existuser.documents.push(newdocument);
    await existuser.save({ session });
    await session.commitTransaction();

    await newdocument.save();

    return res.status(202).send({
      success: true,
      message: "Document saved Successfully",
      newdocument,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in add document controller",
    });
  }
};

exports.deletedocument = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(299).send({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.id = decoded.id;
    } catch (error) {
      return res.status(299).send({
        success: false,
        message: "Un-Authorized",
      });
    }
    const id = req.id;
    const existuser = await usermodel.findById(id);
    if (!existuser) {
      return res.status(404).send({
        success: false,
        message: "User not found in delete controller",
      });
    }

    const document = await documentmodel.findById(req.params.id);
    if (!document) {
      return res.status(404).send({
        success: false,
        message: "document not found in delete controller",
      });
    }

    await existuser.documents.pull(document);

    await existuser.save();

    const deleteddocument = await documentmodel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteddocument) {
      return res.status(404).send({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(202).send({
      success: true,
      message: "Document deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in delete document controller",
    });
  }
};
