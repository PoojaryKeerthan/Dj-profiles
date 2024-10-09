const express=require('express');
const app=express();
const path=require('path');
const UserRoute=require('./routes/user');
const ProfileRoutes=require('./routes/profiles');
const Profile=require('./models/profiles');
const mongoose=require('mongoose');
const authenticateCookie=require('./middleware/authentication');
const cookieparser=require('cookie-parser');
mongoose.connect("mongodb://localhost:27017/costal-djs").then(e=>console.log("mongodb connected"));

app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(cookieparser());

app.use(authenticateCookie("token"));
app.use(express.static(path.resolve('./public')));

app.use('/user',UserRoute);
app.use('/profile',ProfileRoutes);

app.get('/',async(req,res)=>{
    const profiles= await Profile.find({}).populate('createdBy');
    res.render('home',{
        user:req.user,
        profiles:profiles
    })
});
app.listen(8000,()=>console.log("server has been started"));