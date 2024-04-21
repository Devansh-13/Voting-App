const express=require( 'express');
const router=express.Router();
const candidateController= require("../controllers/candidateController");
const {jwtAuthMiddleware, generateToken} = require('../jwt');


router
    .route("/")
    .post(candidateController.addUser);

router
    .route("/login")
    .post(userController.userLogin);

router
    .route("/profile")
    .get(jwtAuthMiddleware,userController.userProfile);

router
    .route("/candidateId")
    .put(jwtAuthMiddleware,candidateController.updateCandidate);


module.exports=router;