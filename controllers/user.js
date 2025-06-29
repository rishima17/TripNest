const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const User=require("../models/user.js");

module.exports.renderSignupForm=async(req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
        const registerUser= await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
             return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
        res.redirect("/listings");
        });
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm=async(req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login=async(req,res)=>{
     req.flash("success","Welcome Back to WanderLust!")
let redirectUrl=res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logOut=(req,res,next)=>{
   req.logout((err)=>{
    if (err){
        next(err);
    }
    req.flash("success", "you are logged out,succesfully!");
    res.redirect("/listings");
   });
};
