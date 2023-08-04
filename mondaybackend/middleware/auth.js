const jwt = require('jsonwebtoken');
const User = require('../model/user_model');
const { secretkey } = require('../config');




module.exports.verifyLogin= function(req,res,next){
    try{
      
        
        
        const auth_header =req.headers.authorization;

        const token=auth_header.split(' ')[1];

        var decoded = jwt.verify(token,secretkey);
       
        User.findOne({_id:decoded.userid}).then(function(userresult){
            req.userInfo= userresult;
            next();
        })
        .catch(function(err){
            res.status(401).json({error:err});
        })

    }
    catch (error){
     res.status(500).json({message:error});
    }
}

// admin ko lagi authorization

module.exports.verifyAdmin= function(req,res,next){

    // console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.userType!=="Admin" || req.userInfo.email!=="admin@gmail.com" || req.userInfo.subrole!=="visitor"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}



module.exports.verifyVip= function(req,res,next){
    console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.userType!=="Vip"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}
module.exports.verifycook= function(req,res,next){
    console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.subrole!=="cook"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}
module.exports.verifywaiter= function(req,res,next){
    console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.subrole!=="waiter"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}
module.exports.verifymanager= function(req,res,next){
    console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.subrole!=="manager"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}


module.exports.verifyvisitor= function(req,res,next){
    // console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.subrole!=="visitor"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}






