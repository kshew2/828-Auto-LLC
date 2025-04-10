const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user.model'); // Adjust the path based on your folder structure

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" });
        }

        if (admin.password !== password) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        // Generate the JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role }, // Payload
            JWT_SECRET,                                                   // Secret key
            { expiresIn: "1h" }                                           // Options
        );

        return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            user: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Error during authentication", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;