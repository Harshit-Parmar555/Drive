const express = require("express")
const {adddocument,deletedocument,alldocument,test} = require("../Controllers/documentcontroller")
const documentrouter = express.Router();

documentrouter.post("/adddocument", adddocument);
documentrouter.delete("/deletedocument/:id", deletedocument );
documentrouter.get("/documentbyid", alldocument );

module.exports = {documentrouter}