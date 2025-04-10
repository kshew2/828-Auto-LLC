const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    // console.log('Token:', token);
    // console.log('JWT_SECRET:', JWT_SECRET);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        req.user = user;
        next();
    });
};

module.exports = verifyAdminToken;