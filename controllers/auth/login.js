const User = require('../../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { createJWT, createTokenUser } = require('../../utils');
const Session = require('../../models/Session');

const login = async(req, res)=>{
    const { email, password } = req.body;
    if(!email || !password) throw new CustomError.BadRequestError('please provide email and password');
    const user = await User.findOne({ email });
    if(!user) throw new CustomError.UnauthenticatedError('Invalid Credentials');
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Password!! Please input the correct password');
    const session = new Session({  userId: user._id });
    await session.save();
    console.log( "SessionId:" + session._id);
    const tokenUser = createTokenUser(user);
    const token = createJWT(tokenUser, session._id);
    
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Logged In ${user.fullname}`,
        user: tokenUser,
        token 
    });
};

module.exports = { login };