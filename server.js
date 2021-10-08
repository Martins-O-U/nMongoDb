const express = require("express");
const mongoose = require('mongoose');
const nacharacter = require('./Projects/Routes/index');
const fileDisplay = require('./public/FileDisplay');

const server = express()

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static('public'));

// ================= Application Routes ==============================

server.use('/api', nacharacter)
server.use('/api/file', fileDisplay)

// ============== Mongoose Setup ================================ //

const url = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

// ================== Mongoose Connection test ===========================
// const db = mongoose.connection
// db.once('open', _ => {
//     console.log('Database connected:', url)
// })

// db.on('error', err => {
//     console.error('connection error:', err)
// })

//============ Deafault Landing Test ========================

server.get('/', (req, res) => {
    res.json({ message: "Welcome to the default test zone, please specify a path e.g. /api/char  for a get request" })
})


module.exports = server;