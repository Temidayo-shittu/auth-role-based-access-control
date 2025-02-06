const { createJWT, isTokenValid } = require('./jwt');
const checkPermissions = require('./checkPermissions');
const userAge = require('./getUserAge');
const createTokenUser = require('./createTokenUser');

module.exports= {
    createJWT,
    isTokenValid,
    createTokenUser,
    checkPermissions,
    userAge
}