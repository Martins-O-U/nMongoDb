
const express = require("express");
const jwt = require("jsonwebtoken");
const cookiepee = require('cookie-parser');


const server = express()

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookiepee());
server.use(express.static('public'));


server.get('/', (req, res) => {
    res.json({ message: "Welcome to the default zone, please specify a path" })
})


module.exports = server;