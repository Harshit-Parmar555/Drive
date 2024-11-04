const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./database/connect");
const cookieparser = require("cookie-parser");
const { userrouter } = require("./Routes/userroute");
const { documentrouter } = require("./Routes/documentroute");
const path = require("path");

const _dirname = path.resolve()


app.use(cors({
  origin: "https://drive-dlqq.onrender.com",
  credentials:true
}));
app.use(express.json());
app.use(cookieparser());
dotenv.config();






const port = process.env.PORT;
connect();

app.use("/api/v1/user", userrouter);
app.use("/api/v1/document", documentrouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get("*" ,(req,res)=>{
  res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
