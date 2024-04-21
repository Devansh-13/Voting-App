const express=require( 'express');
const router=express.Router();
const userController= require("../controllers/userController");
const {jwtAuthMiddleware, generateToken} = require('../jwt');


router
    .route("/signup")
    .post(userController.addUser);

router
    .route("/login")
    .post(userController.userLogin);

router
    .route("/profile")
    .get(jwtAuthMiddleware,userController.userProfile);

router
    .route("/profile.password")
    .put(jwtAuthMiddleware,userController.userPass);


module.exports=router;