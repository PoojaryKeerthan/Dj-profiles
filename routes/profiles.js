const {Router}=require('express');
const router=Router();
const path=require('path');
const multer=require('multer');
const Profile=require('../models/profiles');


router.get('/createprofile',(req,res)=>{
    res.render('createprofile',{
        user:req.user,
    });
});

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(`./public/uploads`));
    },
    filename:function(req,file,cb){
      const fileName=`${Date.now()}-${file.originalname}`
      cb(null,fileName);
    }
});
const upload=multer({storage:storage});

router.post('/createprofile',upload.single("ProfileImage"),async(req,res)=>{
    const{Name,ResidentialPlace,WorkExperience,Contactno,EventCategories}=req.body;
   try {
    await Profile.create({
        Name:Name,
        Residentialplace:ResidentialPlace,
        WorkExperience:WorkExperience,
        ProfileImageURL:`/uploads/${req.file.filename}`,
        contactno:Contactno,
        EventCategories:EventCategories,
        createdBy:req.user._id,

    });
   } catch (error) {
    res.render('createprofile',{
        error:'Some data already exists try otherone'
    })
   } 
    const profiles= await Profile.find({}).populate('createdBy');
    res.render('home',{
        profiles:profiles,
        user:req.user,
    });
    
})

router.get('/:id',async(req,res)=>{
    try {
        const profiles=await Profile.findById(req.params.id).populate('createdBy');
    res.render('profileView',{
        user:req.user,
        profile:profiles,
    });
    } catch (error) {
        console.log("error",error);
    }
    
})

module.exports=router;