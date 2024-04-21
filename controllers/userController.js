
const User=require("../models/userModel");
const {jwtAuthMiddleware, generateToken} = require('../jwt');

//Add user controller
module.exports.addUser = async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the User data

        // Check if there is already an admin user
        const adminUser = await User.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        // Validate Aadhar Card Number must have exactly 12 digit
        if (!/^\d{12}$/.test(data.aadharCardNumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        // Check if a user with the same Aadhar Card Number already exists
        const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
        if ( existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }

        // Create a new User document using the Mongoose model
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('Data saved ');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.userLogin=async(req,res)=>{
    try {
        // exttract the adadhar amd pass from the req
        const {aadharCardNumber,password}=req.body;

        // find the user having this aadhar from our db
        const user=await User.findOne({
            aadharCardNumber:aadharCardNumber
        })
        // if the user does not exist or pass does not match return err
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid Credentials"});
        }

        // generate token
        const payload = {
            id: response.id
        }

        const token = generateToken(payload);

        res.status(200).json({response: response, token: token});
    } 
    catch (error) {
       
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

module.exports.userPass=async(req,res)=>{
    try {
        
        const userId=req.user.id;
        const {currentPassword,newPassword}=req.body;

        // find user with the userId
        const user=await User.findById(userId);
        
        // if pass does not match return err
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:"Current Password is incorrect"});
        }

        // Update
        user.password=newPassword;
        await user.save();
        res.status(200).json({message:"Password updated successfully"});
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


