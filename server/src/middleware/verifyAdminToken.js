{/* Updated firebase logic*/}
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // Use your Firebase service account
    });
}

const verifyAdminToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Check if the user has an admin role
        if (!decodedToken.admin) {
            return res.status(403).json({ message: 'Access Denied. Admin privileges required' });
        }

        // Attach the user information to the request object
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid credentials' });
    }
};

module.exports = verifyAdminToken;

///////////////////////////////////////////////////////////////////////////////////

// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// const verifyAdminToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied. No token provided' });
//     }

//     // console.log('Token:', token);
//     // console.log('JWT_SECRET:', JWT_SECRET);

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: 'Token expired' });
//             }
//             return res.status(403).json({ message: 'Invalid credentials' });
//         }

//         req.user = user;
//         next();
//     });
// };

// module.exports = verifyAdminToken;