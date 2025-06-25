const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    let serviceAccount;
    try {
        if (process.env.FIREBASE_ADMIN_KEY) {
            // For production (Vercel)
            serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
        } else {
            // For local development
            serviceAccount = require('../config/firebaseAdminKey.json');
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
        throw new Error('Failed to initialize Firebase Admin SDK');
    }
}

const verifyAdminToken = async (req, res, next) => {
    //console.log("Request Headers:", req.headers); // Debug: log headers
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        //console.log("Decoded Token:", decodedToken);
        if (!decodedToken.admin) {
            return res.status(403).json({ message: 'Access Denied. Admin privileges required' });
        }
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