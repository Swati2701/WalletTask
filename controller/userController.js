/* eslint-disable */
const User = require('./../models/userModels');
const { sendEmail } = require('./../email');
require('dotenv').config({ path: './config.env' });

const loadash = require('lodash');
const jwt = require('jsonwebtoken');
//const DOMAIN = 'sandbox01d9e8121e5a48ed8017a82e832d7dae.mailgun.org';
//const mailgun = require('mailgun-js');
const expressJWT = require('express-jwt');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


//const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


exports.signup = async (req, res) =>{
    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.json({
                message:"unable to add user"
            })
        }
        return res.json({
            message: "Success",
            user
        })
    })
    let {email } = req.body;
    let token = Math.floor(100000+Math.random() * 900000);
    const sendCode = await sendEmail(email, token);
}

exports.login =async (req, res) =>{
    const { email, password} = req.body;  
    User.findOne({email}, (err,user) =>{
        if(err || !user){             //!user means no email is there
            return res.status(400).json({
                message: "email not found"
            })
        }

        //Authenticate the email 
        if(!user.authenticate(password)){
            return res.status(400).json({
                message: "email and password doesn't match"
            })
        }

        //create Token
        const token = jwt.sign({_id: user._id},process.env.JWT_ACC_ACTIVATE, {expiresIn: process.env.JWT_EXPIRES_IN});

        //put token in cookies
        res.cookie('token', token)

        //send response
        const {_id, name, email} = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })
    })
}

exports.signOut = (req, res) =>{
    res.clearCookie('token');
    return res.json({
        message: "user sign out succesfully"
    })
}
