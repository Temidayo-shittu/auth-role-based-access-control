const jwt = require('jsonwebtoken')

const createJWT = (user, sessionId) => {
    const payload = { ...user, sessionId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
};


const isTokenValid = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;  // Ensure that sessionId is returned as part of the decoded object
  }
  

module.exports = {
    createJWT,
    isTokenValid
};


/*
const attachCookiesToResponse = (res, user)=>{
    const token = createJWT(user);
    const oneDay = 1000 * 60 * 60 * 24 ;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })
}
*/