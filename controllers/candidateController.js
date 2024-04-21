
const Candidate=require("../models/candidateModel");
const User=require("../models/userModel");
const {jwtAuthMiddleware, generateToken} = require('../jwt');


const checkAdminRole=async(userId)=>{
    try {
        const user=await User.findById(userId);
        return user.role==="admin";

    } 
    catch (error) {
        return false;
    }
}

//Add candidate controller
module.exports.addUser = async (req, res) =>{
    try{

        if(!checkAdminRole(req.user.id)){
            return res.status(404).json({msg:"User had not admin role"})
        }
        const data = req.body // Assuming the request body contains the User data

        // Create new andidate
        const newCandidate=new Candidate(data);
        const response=await newCandidate.save();

        res.status(200).json({response:response});
    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
}


module.exports.userProfile=async(req,res)=>{
    try {
        
        const userData=req.user;
        const userId=userData.id;
        const user=await User.findById(userId);
        
        res.status(200).json({user});
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.updateCandidate=async(req,res)=>{
    try {
        if(!checkAdminRole(req.user.id)){
            return res.status(404).json({msg:"User had not admin role"})
        }
        const candidateId=req.params.candidateId;
        const updateCandidateData=req.body;

        // find user with the userId
        const response=await Candidate.findByIdAndUpdate(candidateId,updateCandidateData,{new:true,runValidators:true});
        
       if(!response){
            return res.status(404).json({error: "Can not find this candidate."});
       }
        // Update
        
        res.status(200).json({message:"Candidate Data updated successfully"});
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.deleteCandidate=async(req,res)=>{
    try {
        if(!checkAdminRole(req.user.id)){
            return res.status(404).json({msg:"User had not admin role"})
        }
        const candidateId=req.params.candidateId;

        // find user with the userId
        const response=await Candidate.findByIdAndUpdate(candidateId,updateCandidateData,{new:true,runValidators:true});
        
       if(!response){
            return res.status(404).json({error: "Can not find this candidate."});
       }
        // Update
        
        res.status(200).json({message:"Candidate Data updated successfully"});
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


