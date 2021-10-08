const express = require("express");
const mongoose = require('mongoose');
const Character = require('./Projects/Models/Character')


const server = express()

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static('public'));

const url = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})


// ============== Adding characters without Async =================

// const kakashi = new Character({
//     name: "Kakashi",
//     ultimateP: "Sharingan"
// })

// kakashi.save((error, document) => {
//     if (error) {
//         console.log(error)
//     }
//     console.log(document)
// })


// ======================== Working with Async ======================

// =========== Add Characters =============

const addChar = async () => {

    const ryu = new Character({
        name: 'Ali-boy',
        specials: ["Dance", "Sing", "Run"],
        ultimateP: 'Luku-luku'
    })
    try {
        const doc = await ryu.save()
        console.log(doc)
    }
    catch (error) {
        console.error(error.message)
    }

}

addChar()

// ============== Get Characters ============

const getChar = async () => {
    const getryu = await Character.find({})
    console.log(getryu)
}
getChar()

// =============== Update Characters ==========

// const updateRyu = async () => {
//     const toUpdateRyu = await Character.findOne({ name: "Ryu" })
//     console.log(toUpdateRyu + " Before..")

//     toUpdateRyu.specials = [
//         'Hadoken',
//         'Shoryuken',
//         'Tatsumaki Senpukyaku'
//     ]
//     const updatedRyu = await toUpdateRyu.save()
//     console.log(updatedRyu + " After..")
// }

// updateRyu()

// const secondupdateRyu = async () => {
//     const toUpdateRyu = await Character.findOneAndUpdate({ name: "Ryu" },
//         {
//             specials: [
//                 'Hadoken',
//                 'Shoryuken',
//                 'Tatsumaki Jangu'
//             ]
//         })
//     console.log(toUpdateRyu + " Before..")
//     const updatedRyu = await toUpdateRyu.save()
//     console.log(updatedRyu + " After..")
// }

// secondupdateRyu()

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