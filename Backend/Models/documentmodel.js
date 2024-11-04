const mongoose = require("mongoose");

const documentschema = mongoose.Schema({
  documentname: {
    type: String,
    required: [true, "document name is required"],
  },
  documentlink: {
    type: String,
    required: [true, "document link is required"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const documentmodel = mongoose.model("document" , documentschema);

module.exports = {documentmodel}
