const createTokenUser = (user)=>{
    return {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        age: user.age,
        role: user.role,

    }  
}

module.exports = createTokenUser;