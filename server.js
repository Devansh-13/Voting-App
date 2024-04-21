const app=require("./app.js")
const mongoose=require("mongoose");
const dotenv=require("dotenv");


dotenv.config();

const DATABASE=process.env.DATABASE;
const COLL_NAME=process.env.COLL_NAME;
const PASSWORD=process.env.PASSWORD; 

const DB_URL=DATABASE.replace("<PASSWORD>",PASSWORD).replace("<NAME>",COLL_NAME);

mongoose.connect(DB_URL)
    .then((res)=>{
    console.log("-------------DATABASE CONNECTED------------")
    })
    .catch((err)=>{
        console.log("ERROR:",err);
    })



const PORT=process.env.PORT  || 1400;

app.listen(PORT,()=>{
    console.log("----------Server Created----------");
})
