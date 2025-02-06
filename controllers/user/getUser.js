const User = require('../../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ checkPermissions } = require('../../utils');

const getSingleUser = async(req, res)=>{
    const { id:userId } = req.params;
    const user = await User.findOne({_id:userId}).select('-password');
    if(!user) throw new CustomError.NotFoundError(`User with the given ID: ${userId} not found`);
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({user, count:user.length});  
};

const showCurrentUser = async(req, res)=>{
    const user = await User.findOne({_id:req.user.userId}).select('-password');
    if(!user) throw new CustomError.NotFoundError(`User with the given ID: ${req.user.userId} not found`);
    res.status(StatusCodes.OK).json({user});
};

const getAllUsers = async(req, res)=>{
    const users = await User.find().exec();
    res.status(StatusCodes.OK).json({users, count:users.length});  
};

module.exports = { getSingleUser, showCurrentUser, getAllUsers };