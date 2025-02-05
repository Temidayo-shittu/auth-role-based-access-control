const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { createTokenUser, userAge } = require('../../utils');
const User = require('../../models/User');

const userSignup = async(req, res)=>{
    const { firstname, lastname, email, password, role, dateOfBirth } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    if(emailAlreadyExists) throw new CustomError.BadRequestError('email already exists'); 
    if(role === 'ADMIN') throw new CustomError.BadRequestError('You dont have permission to set yourself as an ADMIN'); 

	const user = new User({
        firstname,
        lastname,
        email,
        password,
        dateOfBirth,
        role: role || 'CARRIER'
		});

    user.fullname  = `${firstname} ${lastname}`;
    user.age = userAge(user.dateOfBirth);

	await user.save();
    const tokenUser = createTokenUser(user);
    
    res.status(StatusCodes.CREATED).json({ 
        message: `Successfully Registered ${user.fullname} as ${user.role}!!`,
        user: tokenUser
    });
};

const adminSignup = async(req, res)=>{
    const { firstname, lastname, email, password, dateOfBirth } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    if(emailAlreadyExists) throw new CustomError.BadRequestError('email already exists'); 

	const user = new User({
        firstname,
        lastname,
        email,
        password,
        dateOfBirth,
        role: 'ADMIN'
		});

    user.fullname  = `${firstname} ${lastname}`;
    user.age = userAge(user.dateOfBirth);

	await user.save();
    const tokenUser = createTokenUser(user);
    
    res.status(StatusCodes.CREATED).json({ 
        message: `Successfully Registered ${user.fullname} as ${user.role}!!`,
        user: tokenUser 
    });
};

module.exports = { userSignup, adminSignup };