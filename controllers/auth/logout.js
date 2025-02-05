const Session = require('../../models/Session');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const logout = async (req, res) => {
    const { sessionId } = req.user; // Extract sessionId from JWT payload

    if (!sessionId) throw new CustomError.BadRequestError('Invalid session ID');

    // Find the session and mark it as inactive
    const session = await Session.findById(sessionId);
    if (!session) throw new CustomError.NotFoundError('Session not found');

    session.isActive = false;
    session.terminatedAt = new Date();
    await session.save();

    res.status(StatusCodes.OK).json({ message: `User with session_id: ${sessionId} Successfully logged out` });
};

module.exports = { logout };
