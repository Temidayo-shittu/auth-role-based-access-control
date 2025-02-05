const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');
const Session = require('../models/Session');

const authenticateUser = async (req, res, next) => {
  let token;

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid! Please login again.');
  }

  try {
    // Validate JWT and extract user data
    const { fullname, userId, role, sessionId } = isTokenValid(token);

    if (!sessionId) {
      throw new CustomError.UnauthenticatedError('Invalid session. Please log in again.');
    }

    // Check if the session is active
    const session = await Session.findOne({ _id: sessionId, isActive: true });
    if (!session) {
      throw new CustomError.UnauthenticatedError('Session expired or invalid. Please log in again.');
    }

    // Attach user data to the request object
    req.user = { fullname, userId, role, sessionId };

    next();
  } catch (error) {
    console.log('Authentication Error:', error.message);
    throw new CustomError.UnauthenticatedError('Authentication failed.');
  }
};


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
