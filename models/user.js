const {Schema,model}=require('mongoose');
const {createHmac,randomBytes}=require('crypto');
const {createTokenForUser}=require('../service/authenication');
const userSchema=Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

userSchema.pre('save',function(next){
    const user=this;
    
    if(!user.isModified("password")) return;
    
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest("hex");
    
    this.salt=salt;
    this.password=hashedPassword;
    
    next();
    });


userSchema.static('matchPasswordandGenereateTOken',async function(email,password){
        const user=await this.findOne({email});
        
        if(!user) throw new Error('User not found');
    
        const salt=user.salt;
        const hashedPassword=user.password;
    
        const userprovidedhash=createHmac('sha256',salt).update(password).digest("hex");
    
        if( hashedPassword !== userprovidedhash) throw new Error("invalid password");
        
        const token=createTokenForUser(user);
        
        return token;
    });

const User=model('User',userSchema);
module.exports=User;