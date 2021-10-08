const express = require("express");
const mongoose = require('mongoose');
const nacharacter = require('./Projects/Routes/CharacterMon')


const server = express()

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static('public'));


server.use('/api', nacharacter)

const url = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})




// =============== Update Characters ==========




// ===================== Delete Characters ==============

// const deleteRyu = async () => {
//     const deleted = await Character.findOneAndDelete({ name: 'Sasuke' })

//     console.log(deleted + " Error..")
// }
// deleteRyu()

server.get('/', (req, res) => {
    res.json({ message: "Welcome to the default zone, please specify a path" })
})

server.get('/browse', (req, res) => {
    res.sendFile(__dirname + '/browserRoute.html')
})


module.exports = server;