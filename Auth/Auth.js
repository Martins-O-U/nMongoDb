require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../Projects/Models/User');


const JWT_SECRET = process.env.JWT || "A secret lives here";


const verifyToken = async (token) => {
    try {
        const verified = await jwt.verify(token, JWT_SECRET);
        if (!verified) {
            res.status(500).json({ message: "Something went wrong:- " + error.message })
        } else {
            return true
        }
    } catch (error) {
        res.status(401).json({ you: 'Invalid credentials!' });
    }
}

const verifyUser = async (email, password) => {
    try {
        const user = await User.findOne({ email }).lean()
        if (!user) {
            return { status: "error", error: "User not found" }
        }
        if (await bcrypt.compare(password, user.password)) {
            token = jwt.sign({ id: user._id, username: user.email }, JWT_SECRET, { expiresIn: '1d' })
            return { status: 'ok', data: token }
        }
        return { status: "error", error: "invalid password" }
    } catch (error) {
        return { status: "error", error: error.message }
    }
}



module.exports = {
    verifyToken,
    verifyUser,
}