const {Schema,model}=require('mongoose');

const ProfileSchema= new Schema({
    Name:{
        type:String,
        required:true,
    },
    Residentialplace:{
        type:String,
        required:true,
    },
    WorkExperience:{
        type:Number,
        required:true,
    },
    ProfileImageURL:{
        type:String,
        required:false,
    },
    contactno:{
        type:Number,
        required:true,
        unique: true,
    },
    EventCategories:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true});




const Profile=model('Profile',ProfileSchema);
module.exports=Profile;