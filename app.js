if (process.env.NODE_ENV !="production"){
    require('dotenv').config();
    }


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const ExpressError = require("./utils/ExpressError.js");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const ListingRouter=require("./routes/listings.js");
const ReviewRouter=require("./routes/reviews.js");
const UserRouter=require("./routes/users.js");
const HomeRouter=require("./routes/home.js");

const { truncateSync } = require("fs");
 //const dbUrl = "mongodb://127.0.0.1:27017/WanderLust";


const dbUrl=process.env.ATLASDB_URL;
main().then((res) => {
    console.log("successful connection");
}).catch((err) => {
    console.log(err);
}); 

async function main() {
    await mongoose.connect(dbUrl);
    console.log('db connected');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,

});
store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly: true
    },

};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
 res.locals.success=req.flash("success");
 res.locals.error=req.flash("error");
 res.locals.currUser = req.user;

 next();
});

app.get("/demouser",async(req,res)=>{

    let fakeUser=new User(
        {
            email:"abc@gmail.com",
            username:"abc"

        });
  
    let newUser= await User.register(fakeUser,"hello world");
    res.send(newUser);
});

app.use("/",HomeRouter);
app.use("/listings",ListingRouter);
app.use("/listings/:id/reviews",ReviewRouter);
app.use("/",UserRouter);




//Catch-all route
app.use( (req, res, next) => {
  next  (new ExpressError(404, "Page not found!"));

});

//Error handler route
app.use((err, req, res, next) => {
    let { status=500, message="something wnet wrong!" ,stack} = err;
    res.status(status).render("./listings/error.ejs",{ message });
    //res.status(status).send(message);
});

app.listen(8080, () => {
    console.log("app is listening on port 8080");

});
