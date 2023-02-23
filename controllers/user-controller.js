import User from "../models/user.js"
import bcrypt from "bcryptjs";


export const signup = async (req,res,next) => {
    const { username, password, email } = req.body; //{} - deconstruct body
    let existingUser;
    try{
        existingUser = await User.findOne({ username });// filter by username
    }catch(err){
        return console.log(err);
    }

    if(existingUser){
       return  res
       .status(400).
       json({message: "User already exists!Login instead"});
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }

    return res.status(201).json({user})
}

export const login = async (req,res,next) => {
    const { username, password } = req.body; //{} - deconstruct body
    let existingUser;
    try{
        existingUser = await User.findOne({ username });// filter by username
    }catch(err){
        return console.log(err);
    }

    if(!existingUser){
       return  res
       .status(404).
       json({message: "Couldn't find user by this username!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password!"});
    }
    return res.status(200).json({message: "Login successful"});

}

export const getUserDetails = async (req,res,next) => {
    let usernameID = req.params.username;
    let user;
    try{
        user = await User.findOne( {username: usernameID });
    } catch(err) {
        return console.log(err);
    }

    if(!user) {
        return res.status(404).json({message: "No user found by that username!"});
    }
        return res.status(200).json({user});

}

export const updateUserDetails = async (req,res,next) => {
    const { email } = req.body;
    let usernameID = req.params.username;
    let user;
    try{
        user = await User.findOneAndUpdate( 
            {username: usernameID},
            {$set: { email }},
            {new: true})
    } catch(err) {
        return console.log(err);
    }

    if(!user) {
        return res.status(500).json({message: "Unable to update user!"});
    }
        return res.status(200).json({user});

}
