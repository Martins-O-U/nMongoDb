const express = require("express");
const jwt = require("jsonwebtoken");
const cookiepee = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const server = express()
const JWT_SECRET = process.env.JWT;
const MONGODB_URL = process.env.MONGODB
const salt = 10

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookiepee());
server.use(express.static('public'));

mongoose.connect(MONGODB_URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: false },
    password: { type: String, required: true }
}, { collection: 'users' })

const User = mongoose.model('User', UserSchema);

server.get('/', (req, res) => {
    res.json({ message: "Welcome to the default zone, please specify a path" })
})

server.post('/signup', async (req, res) => {
    //const { email, password } = req.body;
    //const hashedpassword = await bcrypt.hash(password, salt);
    //const editpas = String(hashedpassword)
    const npassword = 123
    const email = "abc@dcc.com"
    try {
        const response = await User.create({ email, npassword })
        return res.redirect('/')
    } catch (error) {
        console.log(JSON.stringify(error));
        if (error.code === 11000) {
            return res.send({ status: 'error', error: 'email already exist' })
        }
        throw error
    }
})

const verifyuser = async (email, password) => {
    try {
        const user = await User.findOne({ email }).lean()
        if (!user) {
            return { status: "error", error: "User not found" }
        }
        if (await bcrypt.compare(password, user.password)) {
            token = jwt.sign({ id: user._id, username: user.email, type: 'user' },
                JWT_SECRET,
                { expiresIn: '2h' })
            return { status: 'ok', data: token }
        }
        return { status: "error", error: "invalid password" }
    } catch (error) {
        console.log(error);
        return { status: "error", error: "Timed Out" }
    }
}

server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const response = await verifyuser(email, password);
    if (response.status === "ok") {
        res.cookies('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
        res.redirect('/')
    } else {
        res.json(response)
    }
})

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        if (verify.type === 'user') { return true; }
        else { return false }
    } catch (error) {
        console.log(JSON.stringify(error), "error")
        return false
    }
}

server.get('/', (req, res) => {
    const { token } = req.cookies;
    if (verifyToken(token)) {
        return res.render('home')
    } else {
        res.redirect('/login')
    }
})

server.get('/login', (req, res) => {
    res.render('signin')
})

server.get('/signup', (req, res) => {
    res.render('signup')
})

module.exports = server;