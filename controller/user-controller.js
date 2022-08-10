const User = require("../model/User");

const getAllUsers = async(req,res,next)=>{
    let users;
   try{ 
    users = await User.find();
    }
   catch(err){
     return next(err);
   }
   if(!users){
    return res.json({message :"users not found"})
   }
   return res.json({users})
}

const addUser = async(req,res,next)=>{
    const { name,email,password } = req.body;
    if(!name && name.trim() == " " && 
    !email && email.trim()== " "&&
    !password && password < 6 == " "){
        return res.json({message :"user not updated"})
    }
    let user;
    try{
       user = new User({
        name,email,password
       })
       user = await user.save()
    }catch(err){
        return next (err)
    }
    if(!user){
        return res.json({message:"user not found"})
    }return  res.json({ user })
}

const updateUser = async(req,res,next)=> {
    const id = req.params.id;
    const { name,email,password } = req.body;
    if(!name && name.trim() == " " && 
    !email && email.trim()== " "&&
    !password && password < 6 == " "){
        return res.json({message :"user not updated"})
    }
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{name,email,password})
    }catch(err){
      return next(err)
    }
    if(!user){
        return res.json({message:"user not updated"})
    }
    return res.json({ user })
}

const deleteUser = async(req,res,next)=>{
    const id = req.params.id;
    let user;
    try{
        user =await User.findByIdAndRemove(id)
    }catch(err)
    {return next(err)}
    if(!user){
        return res.json({message:"user not found"})
    }return res.json({message:"user deleted by id"})
}

const getUser = async(req,res,next)=>{
    const id = req.params.id;
    let user;
    try{
     user = await User.findById(id);
    }
    //   user = user.save();

    catch(err){
        return next (err)
    }
    if(!user){
        return res.json({message:'user not found'})
    }return res.json({user})
}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;