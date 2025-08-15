const express=require("express")
const cors=require("cors")
const aiRoutes=require("./routes/ai.routes")
const app=express();

app.use(cors())
app.get("/",(req,res)=>{
    console.log("hello world")
    res.send("hello world")
})
app.use(express.json())
app.use("/ai",aiRoutes)
module.exports=app;
