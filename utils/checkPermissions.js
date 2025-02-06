const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId)=>{
    if(requestUser.role === 'ADMIN' || requestUser.userId === resourceUserId.toString()) return
     throw new CustomError.UnauthorizedError('Unauthorized to access routes')

};

module.exports = checkPermissions;