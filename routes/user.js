const {Router}=require('express');
const User=require('../models/user');
const router=Router();

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})


router.post('/signup',async(req,res)=>{
    const {Username,email,password}=req.body;
    await User.create({
        username:Username,
        email,
        password,
    }); 
    res.redirect('/user/signin');
});
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const token= await User.matchPasswordandGenereateTOken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        res.render('signin',{
            error:"invalid email or password"
        })
    }
});
router.get('/Logout',(req,res)=>{
    res.clearCookie("token").redirect('/');
})



module.exports=router;