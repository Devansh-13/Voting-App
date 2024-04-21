const express=require("express");
const morgan=require("morgan");
const userRoutes=require("./routes/userRoutes.js")
const candidateRoutes=require("./routes/candidateRoutes.js")
const {jwtAuthMiddleware} =require("./jwt.js");
const app=express();

//middlewares

app.use(express.json()); //parse request body as json
app.use(morgan('dev'));
app.use((req,res,next)=>{
    res.append("Server-Time",new Date().toISOString());
    next();
})
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/candidate",jwtAuthMiddleware,candidateRoutes);



module.exports=app;